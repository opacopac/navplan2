<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\ProjectionCenterParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyProjectionCenter1;
use PHPUnit\Framework\TestCase;


class ProjectCenterParserTest extends TestCase {
    public function test_parse() {
        $value = DummyProjectionCenter1::createValue();
        $expected = DummyProjectionCenter1::create();

        $flags = ProjectionCenterParser::parse($value);

        $this->assertEquals($expected, $flags);
    }


    public function test_isNorthPoleOnProjectionPlane() {
        $valTrue = 0b00000000;
        $valFalse = 0b10000000;

        $resultTrue = ProjectionCenterParser::parse($valTrue);
        $resultFale = ProjectionCenterParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isNorthPoleOnProjectionPlane());
        $this->assertEquals(false, $resultFale->isNorthPoleOnProjectionPlane());
    }


    public function test_isProjectionBiPolar() {
        $valTrue = 0b01000000;
        $valFalse = 0b00000000;

        $resultTrue = ProjectionCenterParser::parse($valTrue);
        $resultFale = ProjectionCenterParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isProjectionBiPolar());
        $this->assertEquals(false, $resultFale->isProjectionBiPolar());
    }
}
