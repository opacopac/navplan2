<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section8;

use Navplan\MeteoGrib2\Grib2Parser\Section8\Section8Parser;
use NavplanTest\MeteoGrib2\FileHelper;
use NavplanTest\MeteoGrib2\Mocks\Section8\DummySection8_1;
use PHPUnit\Framework\TestCase;


class Section8ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection8_1::createData();
        $file = FileHelper::createInMem($data);

        Section8Parser::parse($file);

        $this->assertEquals(1, 1);
    }


    public function test_parse_invalid() {
        $data = pack("a4", "1234");
        $file = FileHelper::createInMem($data);

        $this->expectException(\InvalidArgumentException::class);

        Section8Parser::parse($file);
    }
}
