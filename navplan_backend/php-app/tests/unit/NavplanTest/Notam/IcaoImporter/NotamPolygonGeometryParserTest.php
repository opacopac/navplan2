<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Notam\IcaoImporter\INotamPolygonGeometryParser;
use Navplan\Notam\IcaoImporter\NotamCoordinateParser;
use Navplan\Notam\IcaoImporter\NotamPolygonGeometryParser;
use Navplan\System\Domain\Service\ILoggingService;
use PHPUnit\Framework\TestCase;


class NotamPolygonGeometryParserTest extends TestCase
{
    private INotamPolygonGeometryParser $parser;

    protected function setUp(): void
    {
        $logger = $this->createMock(ILoggingService::class);
        $coordinateParser = new NotamCoordinateParser($logger);
        $this->parser = new NotamPolygonGeometryParser($logger, $coordinateParser);
    }

    public function test_it_parses_polygon_without_brackets()
    {
        // given
        $notam_msg = "AIRSPACE RESTRICTION AREA BOUNDED BY 472401N0083320E 472315N0082918E 471935N0083439E 472103N0083855E 472119N0083657E 472137N0083602E 472215N0083450E TO SURFACE";

        // when
        $result = $this->parser->tryParsePolygon($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(7, count($result->position2dList));
        
        // Verify first coordinate
        $this->assertEqualsWithDelta(8.555556, $result->position2dList[0]->longitude, 0.000001);
        $this->assertEqualsWithDelta(47.400278, $result->position2dList[0]->latitude, 0.000001);
        
        // Verify last coordinate
        $this->assertEqualsWithDelta(8.580556, $result->position2dList[6]->longitude, 0.000001);
        $this->assertEqualsWithDelta(47.370833, $result->position2dList[6]->latitude, 0.000001);
    }


    public function test_it_parses_polygon_with_brackets()
    {
        // given
        $notam_msg = "AIRSPACE RESTRICTION 472401N0083320E 472315N0082918E 471935N0083439E 472103N0083855E 472119N0083657E 472137N0083602E 472215N0083450E (CENTER POINT 472209N0083406E RADIUS 3.5 NM) TO SURFACE";

        // when
        $result = $this->parser->tryParsePolygon($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(7, count($result->position2dList));
        
        // Verify first coordinate
        $this->assertEqualsWithDelta(8.555556, $result->position2dList[0]->longitude, 0.000001);
        $this->assertEqualsWithDelta(47.400278, $result->position2dList[0]->latitude, 0.000001);
    }


    public function test_it_returns_null_for_less_than_3_coordinates()
    {
        // given
        $notam_msg = "AIRSPACE RESTRICTION 472401N0083320E 472315N0082918E TO SURFACE";

        // when
        $result = $this->parser->tryParsePolygon($notam_msg);

        // then
        $this->assertNull($result);
    }


    public function test_it_returns_null_for_no_coordinates()
    {
        // given
        $notam_msg = "AIRSPACE RESTRICTION WITH NO COORDINATES";

        // when
        $result = $this->parser->tryParsePolygon($notam_msg);

        // then
        $this->assertNull($result);
    }


    public function test_it_parses_polygon_with_different_coordinate_formats()
    {
        // given
        $notam_msg = "AREA BOUNDED BY 463447N0062121E 341640N0992240W 520000N0010000E";

        // when
        $result = $this->parser->tryParsePolygon($notam_msg);

        // then
        $this->assertNotNull($result);
        $this->assertEquals(3, count($result->position2dList));
        
        // Verify coordinates
        $this->assertEqualsWithDelta(6.355833, $result->position2dList[0]->longitude, 0.000001);
        $this->assertEqualsWithDelta(46.579722, $result->position2dList[0]->latitude, 0.000001);
        
        $this->assertEqualsWithDelta(-99.377778, $result->position2dList[1]->longitude, 0.000001);
        $this->assertEqualsWithDelta(34.277778, $result->position2dList[1]->latitude, 0.000001);
        
        $this->assertEqualsWithDelta(1.0, $result->position2dList[2]->longitude, 0.000001);
        $this->assertEqualsWithDelta(52.0, $result->position2dList[2]->latitude, 0.000001);
    }
}
