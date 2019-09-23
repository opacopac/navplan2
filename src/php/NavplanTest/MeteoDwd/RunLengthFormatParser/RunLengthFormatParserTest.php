<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoDwd\RunLengthFormatParser\RunLengthFormatParser;
use NavplanTest\MeteoDwd\Mocks\DummyFxProduct1;
use PHPUnit\Framework\TestCase;


class RunLengthFormatParserTest extends TestCase {
    public function test_parse() {
        $data = DummyFxProduct1::createData();
        $expected = DummyFxProduct1::create();

        $header = RunLengthFormatParser::parse($data);

        $this->assertEquals($expected, $header);
    }
}
