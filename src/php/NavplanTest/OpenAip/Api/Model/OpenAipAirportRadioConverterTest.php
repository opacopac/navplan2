<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Aerodrome\Domain\Model\AirportRadioType;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirportRadioConverter;
use PHPUnit\Framework\TestCase;


class OpenAipAirportRadioConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "value": "122.880",
            "unit": 2,
            "type": 10,
            "name": "INFO",
            "primary": true,
            "publicUse": true,
            "_id": "62614a351eacded7b7bbdc9d"
        }', true, JSON_NUMERIC_CHECK);


        $radio = OpenAipAirportRadioConverter::fromRest($restStr);

        $this->assertEquals(AirportRadioType::INFO, $radio->type);
        $this->assertEquals("COMMUNICATION", $radio->category);
        $this->assertEquals("INFO", $radio->name);
        $this->assertEquals(new Frequency(122.880, FrequencyUnit::MHZ), $radio->frequency);
        $this->assertEquals(true, $radio->isPrimary);
    }
}
