<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Notam\IcaoImporter\INotamCircleGeometryParser;
use Navplan\Notam\IcaoImporter\NotamCircleGeometryParser;
use Navplan\Notam\IcaoImporter\NotamCoordinateParser;
use Navplan\System\Domain\Service\ILoggingService;
use PHPUnit\Framework\TestCase;


class NotamCircleGeometryParserTest extends TestCase
{
    private INotamCircleGeometryParser $parser;

    protected function setUp(): void
    {
        $logger = $this->createMock(ILoggingService::class);
        $coordinateParser = new NotamCoordinateParser($logger);
        $this->parser = new NotamCircleGeometryParser($logger, $coordinateParser);
    }

    public function test_it_parses_the_circle_in_format1()
    {
        // given
        $notam_msg = "AIRSPACE RESTRICTION NXT COOR 040924.97N0745316.72W RADIUS 2 NM "; // TODO withdout space at the end

        // when
        $result = $this->parser->tryParseCircleFromMessageVariant1($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(2, $result->radius->getNm());
        $this->assertEqualsWithDelta(-74.887978, $result->center->longitude, 0.000001);
        $this->assertEqualsWithDelta(4.156936, $result->center->latitude, 0.000001);
    }


    public function test_it_parses_the_circle_in_format2()
    {
        // given
        $notam_msg = "FIREWORKS DISPLAY WILL TAKE PLACE WI AREA 100M RADIUS OF\n452809N0084942E / BOFFALORA SOPRA TICINO - W MILANO / ELEV 328FT AGL";

        // when
        $result = $this->parser->tryParseCircleFromMessageVariant2($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(100, $result->radius->getM());
        $this->assertEqualsWithDelta(8.828333, $result->center->longitude, 0.000001);
        $this->assertEqualsWithDelta(45.469167, $result->center->latitude, 0.000001);
    }


    public function test_it_parses_the_circle_in_format3() {
        // given
        $notam_msg = "TEMPO RESTRICTED AREA ACT AS FLW\nA CIRCLE RADIUS 3.5NM CENTERED ON 364844N1264748E";

        // when
        $result = $this->parser->tryParseCircleFromMessageVariant3($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(3.5, $result->radius->getNm());
        $this->assertEqualsWithDelta(126.796667, $result->center->longitude, 0.000001);
        $this->assertEqualsWithDelta(36.812222, $result->center->latitude, 0.000001);
    }
}
