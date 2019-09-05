<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section6;

use Navplan\MeteoGrib2\Grib2Parser\Section6\Section6Parser;
use NavplanTest\MeteoGrib2\FileHelper;
use NavplanTest\MeteoGrib2\Mocks\Section6\DummySection6_1;
use NavplanTest\MeteoGrib2\Mocks\Section6\DummySection6_2;
use PHPUnit\Framework\TestCase;


class Section6ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection6_1::createData();
        $file = FileHelper::createInMem($data);
        $expected = DummySection6_1::create();

        $template = Section6Parser::parse($file);

        $this->assertEquals($expected, $template);
    }


    public function test_parse_with_bitmap() {
        $data = DummySection6_2::createData();
        $file = FileHelper::createInMem($data);
        $expected = DummySection6_2::create();

        $template = Section6Parser::parse($file);

        $this->assertEquals($expected, $template);
    }
}
