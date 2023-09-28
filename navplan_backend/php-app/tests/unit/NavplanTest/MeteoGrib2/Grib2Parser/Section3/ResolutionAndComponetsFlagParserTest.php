<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\ResolutionAndComponentFlagsParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyResolutionAndComponentFlags1;
use PHPUnit\Framework\TestCase;


class ResolutionAndComponetsFlagParserTest extends TestCase {
    public function test_parse() {
        $value = DummyResolutionAndComponentFlags1::createValue();
        $expected = DummyResolutionAndComponentFlags1::create();

        $flags = ResolutionAndComponentFlagsParser::parse($value);

        $this->assertEquals($expected, $flags);
    }


    public function test_iDirection() {
        $valTrue = 0b00100000;
        $valFalse = 0b00000000;

        $resultTrue = ResolutionAndComponentFlagsParser::parse($valTrue);
        $resultFale = ResolutionAndComponentFlagsParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isIDirectionIncrementsGiven());
        $this->assertEquals(false, $resultFale->isIDirectionIncrementsGiven());
    }


    public function test_jDirection() {
        $valTrue = 0b00010000;
        $valFalse = 0b00000000;

        $resultTrue = ResolutionAndComponentFlagsParser::parse($valTrue);
        $resultFale = ResolutionAndComponentFlagsParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isJDirectionIncrementsGiven());
        $this->assertEquals(false, $resultFale->isJDirectionIncrementsGiven());
    }


    public function test_uvRelativeToEw() {
        $valTrue = 0b00000000;
        $valFalse = 0b00001000;

        $resultTrue = ResolutionAndComponentFlagsParser::parse($valTrue);
        $resultFale = ResolutionAndComponentFlagsParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isUVRelativeToEW());
        $this->assertEquals(false, $resultFale->isUVRelativeToEW());
    }
}
