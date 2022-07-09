<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\OpenAip\Api\Model\OpenAipApiFrequencyConverter;
use PHPUnit\Framework\TestCase;


class OpenAipRestFrequencyConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "value": "112.050",
            "unit": 2
        }', true, JSON_NUMERIC_CHECK);


        $frequency = OpenAipApiFrequencyConverter::fromRest($restStr);

        $this->assertEquals(112.050, $frequency->value);
        $this->assertEquals(FrequencyUnit::MHZ, $frequency->unit);
    }
}
