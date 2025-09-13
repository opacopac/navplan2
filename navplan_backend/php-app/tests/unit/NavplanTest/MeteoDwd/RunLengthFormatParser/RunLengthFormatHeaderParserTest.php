<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoForecast\RunLengthFormatParser\RunLengthFormatHeaderParser;
use NavplanTest\MeteoDwd\Mocks\DummyFxProductHeader1;
use PHPUnit\Framework\TestCase;


class RunLengthFormatHeaderParserTest extends TestCase {
    public function test_parse() {
        $data = DummyFxProductHeader1::createData();
        $expected = DummyFxProductHeader1::create();

        $header = RunLengthFormatHeaderParser::parse($data);

        $this->assertEquals($expected, $header);
    }
}
