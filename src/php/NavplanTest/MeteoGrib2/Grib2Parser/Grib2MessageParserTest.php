<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Grib2Parser\Grib2MessageParser;
use NavplanTest\MeteoGrib2\FileHelper;
use NavplanTest\MeteoGrib2\Mocks\DummyGrib2Message1;
use PHPUnit\Framework\TestCase;


class Grib2MessageParserTest extends TestCase {
    public function test_parse() {
        $data = DummyGrib2Message1::createData();
        $file = FileHelper::createInMem($data);
        $expected = DummyGrib2Message1::create();

        $message = Grib2MessageParser::parse($file);

        $this->assertEquals($expected, $message);
    }
}
