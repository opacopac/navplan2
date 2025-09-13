<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoForecast\RunLengthFormatParser\RunLengthFormat16BitValuesParser;
use NavplanTest\MeteoDwd\Mocks\DummyFxProductValues1;
use PHPUnit\Framework\TestCase;


class RunLengthFormatValuesParserTest extends TestCase {
    public function test_parse() {
        $data = DummyFxProductValues1::createData();
        $expected = DummyFxProductValues1::create();

        $values = RunLengthFormat16BitValuesParser::parse($data);

        $this->assertEquals($expected, $values);
    }
}
