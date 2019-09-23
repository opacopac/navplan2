<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section0;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Grib2Parser\Section0\Section0Parser;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummySection0_1;
use PHPUnit\Framework\TestCase;


class Section0ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection0_1::createData();
        $expected = DummySection0_1::create();

        $section = Section0Parser::parse($data);

        $this->assertEquals($expected, $section);
    }


    public function test_parse_wrong_magic() {
        $data = pack("a4nCCJ","XXXX",0, 10, 2, 16);

        $this->expectException(InvalidArgumentException::class);

        Section0Parser::parse($data);
    }


    public function test_parse_wrong_edition() {
        $data = pack("a4nCCJ","GRIB",0, 10, 9, 16);

        $this->expectException(InvalidArgumentException::class);

        Section0Parser::parse($data);
    }
}
