<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipFrequencyConverter;
use PHPUnit\Framework\TestCase;


class OpenAipFrequencyConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "value": "112.050",
            "unit": 2
        }', true, JSON_NUMERIC_CHECK);


        $frequency = OpenAipFrequencyConverter::fromRest($restStr);

        $this->assertEquals(112.050, $frequency->value);
        $this->assertEquals(FrequencyUnit::MHZ, $frequency->unit);
    }
}
