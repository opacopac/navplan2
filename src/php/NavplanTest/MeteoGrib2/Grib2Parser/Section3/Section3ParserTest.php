<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Grib2Parser\Section1\Section1Parser;
use NavplanTest\MeteoGrib2\FileHelper;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use PHPUnit\Framework\TestCase;


class Section3ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection1_1::createData();
        $file = FileHelper::createInMem($data);
        $expected = DummySection1_1::create();

        $section = Section1Parser::parse($file);

        $this->assertEquals($expected, $section);
    }


    public function test_parse_wrong_section() {
        $data = pack("NCnnCCCnCCCCCCC",21, 9, 215, 4, 2, 0, 1, 2019, 8, 26, 14, 3, 34, 0, 1);
        $file = FileHelper::createInMem($data);

        $this->expectException(InvalidArgumentException::class);

        Section1Parser::parse($file);
    }
}
