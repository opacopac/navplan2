<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAltitudeConverter;
use PHPUnit\Framework\TestCase;


class OpenAipRestAltitudeConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "value": 999,
            "unit": 6,
            "referenceDatum": 2
        }', true, JSON_NUMERIC_CHECK);

        $alt = OpenAipAltitudeConverter::fromRest($restStr);

        $this->assertEquals(999, $alt->value);
        $this->assertEquals(AltitudeUnit::FL, $alt->unit);
        $this->assertEquals(AltitudeReference::STD, $alt->reference);
    }


    public function test_fromRest2() {
        $restStr = json_decode('{
            "value": 0,
            "unit": 1,
            "referenceDatum": 0
        }', true, JSON_NUMERIC_CHECK);

        $alt = OpenAipAltitudeConverter::fromRest($restStr);

        $this->assertEquals(0, $alt->value);
        $this->assertEquals(AltitudeUnit::FT, $alt->unit);
        $this->assertEquals(AltitudeReference::GND, $alt->reference);
    }
}
