<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Notam\IcaoImporter\NotamAltitudeLinesParser;
use PHPUnit\Framework\TestCase;


class NotamAltitudeLinesParserTest extends TestCase
{
    public function test_it_parses_the_altitudes_in_the_notam_message_from_SFC_to_500FT_AGL()
    {
        // given
        $notam_text = "W1239/25 NOTAMN\nQ) LFEE/QWULW/IV/BO /W /000/020/4729N00725E005\nA) LFEE B) 2507010000 C) PERM\nE) MODELFLYING ACTIVITY OVER 'WOLSCHWILLER' (68)\nPSN : 472839N 0072511E\nHOURS : 0700-1100 1200-1900, SUM -1HR ONLY BY DAY\nF) SFC G) 500FT AGL\nCREATED: 13 Jun 2025 10:19:00 \nSOURCE: EUECYIYN";

        // when
        $result = NotamAltitudeLinesParser::tryParseAltitudesFromGAndFLines($notam_text);

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
}
