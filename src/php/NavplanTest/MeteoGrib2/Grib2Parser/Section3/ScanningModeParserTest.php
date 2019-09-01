<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\ScanningModeParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyScanningMode1;
use PHPUnit\Framework\TestCase;


class ScanningModeParserTest extends TestCase {
    public function test_parse() {
        $value = DummyScanningMode1::createValue();
        $expected = DummyScanningMode1::create();

        $scanningMode = ScanningModeParser::parse($value);

        $this->assertEquals($expected, $scanningMode);
    }


    public function test_iScanDirection() {
        $valTrue = 0b00000000;
        $valFalse = 0b10000000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isIScanDirectionWtoE());
        $this->assertEquals(false, $resultFale->isIScanDirectionWtoE());
    }


    public function test_jScanDirection() {
        $valTrue = 0b01000000;
        $valFalse = 0b00000000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isJScanDirectionNtoS());
        $this->assertEquals(false, $resultFale->isJScanDirectionNtoS());
    }


    public function test_iConsecutivePoints() {
        $valTrue = 0b00000000;
        $valFalse = 0b00100000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isIConsecutivePoints());
        $this->assertEquals(false, $resultFale->isIConsecutivePoints());
    }


    public function test_allRowsSameDirection() {
        $valTrue = 0b00000000;
        $valFalse = 0b00010000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isAllRowsSameDirection());
        $this->assertEquals(false, $resultFale->isAllRowsSameDirection());
    }


    public function test_oddRowsOffset() {
        $valTrue = 0b00001000;
        $valFalse = 0b00000000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isOddRowsAreOffset());
        $this->assertEquals(false, $resultFale->isOddRowsAreOffset());
    }


    public function test_evenRowsOffset() {
        $valTrue = 0b00000100;
        $valFalse = 0b00000000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isEvenRowsAreOffset());
        $this->assertEquals(false, $resultFale->isEvenRowsAreOffset());
    }


    public function test_jDirOffset() {
        $valTrue = 0b00000010;
        $valFalse = 0b00000000;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isJDirOffset());
        $this->assertEquals(false, $resultFale->isJDirOffset());
    }


    public function test_isAllRowsNiColsNjPoints() {
        $valTrue = 0b00000000;
        $valFalse = 0b00000001;

        $resultTrue = ScanningModeParser::parse($valTrue);
        $resultFale = ScanningModeParser::parse($valFalse);

        $this->assertEquals(true, $resultTrue->isAllRowsNiColsNjPoints());
        $this->assertEquals(false, $resultFale->isAllRowsNiColsNjPoints());
    }
}
