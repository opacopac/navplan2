<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Notam\IcaoImporter\IcaoApiNotam;
use Navplan\Notam\IcaoImporter\IcaoApiNotamQLine;
use Navplan\Notam\IcaoImporter\INotamAltitudeParser;
use Navplan\Notam\IcaoImporter\NotamAltitudeParser;
use Navplan\System\Domain\Service\ILoggingService;
use PHPUnit\Framework\TestCase;


class NotamAltitudeParserTest extends TestCase
{
    private INotamAltitudeParser $parser;

    
    protected function setUp(): void
    {
        $logger = $this->createMock(ILoggingService::class);
        $this->parser = new NotamAltitudeParser($logger);
    }


    public function test_it_parses_altitudes_from_F_and_G_lines()
    {
        // given
        $notamText = "W1239/25 NOTAMN\nQ) LFEE/QWULW/IV/BO /W /000/020/4729N00725E005\nA) LFEE B) 2507010000 C) PERM\nE) MODELFLYING ACTIVITY\nF) SFC G) 500FT AGL\nCREATED: 13 Jun 2025 10:19:00";
        $icaoApiNotam = $this->createIcaoApiNotam($notamText, null);

        // when
        $result = $this->parser->parseAltitudes($icaoApiNotam);

        // then
        $this->assertNotNull($result);
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

        // Bottom altitude: SFC
        $this->assertEquals(0, $result[0]->value);
        $this->assertEquals(AltitudeUnit::FT, $result[0]->unit);
        $this->assertEquals(AltitudeReference::GND, $result[0]->reference);

        // Top altitude: 500FT AGL
        $this->assertEquals(500, $result[1]->value);
        $this->assertEquals(AltitudeUnit::FT, $result[1]->unit);
        $this->assertEquals(AltitudeReference::GND, $result[1]->reference);
    }


    public function test_it_falls_back_to_qLine_when_F_and_G_lines_not_found()
    {
        // given
        $notamText = "A0123/25 NOTAMN\nQ) LSAS/QRDCA/IV/BO/AE/000/045/4650N00825E005\nA) LSAS B) 2501060800 C) 2501062000\nE) DANGER AREA LS-D15 ACTIVATED";
        $qLine = $this->createQLineWithAltitudes(
            Altitude::fromFtAmsl(0),
            Altitude::fromFl(45)
        );
        $icaoApiNotam = $this->createIcaoApiNotam($notamText, $qLine);

        // when
        $result = $this->parser->parseAltitudes($icaoApiNotam);

        // then
        $this->assertNotNull($result);
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

        // Bottom altitude: 0 FT AMSL
        $this->assertEquals(0, $result[0]->value);
        $this->assertEquals(AltitudeUnit::FT, $result[0]->unit);
        $this->assertEquals(AltitudeReference::MSL, $result[0]->reference);

        // Top altitude: FL045
        $this->assertEquals(45, $result[1]->value);
        $this->assertEquals(AltitudeUnit::FL, $result[1]->unit);
        $this->assertEquals(AltitudeReference::STD, $result[1]->reference);
    }


    public function test_it_returns_null_when_no_altitudes_found()
    {
        // given
        $notamText = "A0123/25 NOTAMN\nE) SOME NOTAM WITHOUT ALTITUDE INFO";
        $icaoApiNotam = $this->createIcaoApiNotam($notamText, null);

        // when
        $result = $this->parser->parseAltitudes($icaoApiNotam);

        // then
        $this->assertNull($result);
    }


    public function test_it_prefers_F_and_G_lines_over_qLine()
    {
        // given
        $notamText = "W1239/25 NOTAMN\nF) SFC G) 1000FT AGL\nE) TEST";
        $qLine = $this->createQLineWithAltitudes(
            Altitude::fromFtAmsl(0),
            Altitude::fromFl(100)
        );
        $icaoApiNotam = $this->createIcaoApiNotam($notamText, $qLine);

        // when
        $result = $this->parser->parseAltitudes($icaoApiNotam);

        // then
        $this->assertNotNull($result);
        // Should use F/G lines (1000FT AGL), not qLine (FL100)
        $this->assertEquals(1000, $result[1]->value);
        $this->assertEquals(AltitudeUnit::FT, $result[1]->unit);
        $this->assertEquals(AltitudeReference::GND, $result[1]->reference);
    }


    private function createIcaoApiNotam(string $notamText, ?IcaoApiNotamQLine $qLine): IcaoApiNotam
    {
        return new IcaoApiNotam(
            1,
            "QW",
            "UL",
            "QWULW",
            "Warning",
            "Model flying",
            null,
            "Low",
            "Working",
            "TEST MESSAGE",
            "2025-01-06 08:00:00",
            "2025-01-06 20:00:00",
            $notamText,
            "LSAS",
            true,
            "2025-01-06 07:00:00",
            "A0123/25-LSAS",
            "airport",
            "CHE",
            "Switzerland",
            $qLine
        );
    }


    private function createQLineWithAltitudes(Altitude $lowerLimit, Altitude $upperLimit): IcaoApiNotamQLine
    {
        return new IcaoApiNotamQLine(
            "LSAS",
            "QRDCA",
            "IV",
            "BO",
            "AE",
            $lowerLimit,
            $upperLimit,
            new \Navplan\Common\Domain\Model\Position2d(8.5, 46.5),
            \Navplan\Common\Domain\Model\Length::fromNm(5)
        );
    }
}
