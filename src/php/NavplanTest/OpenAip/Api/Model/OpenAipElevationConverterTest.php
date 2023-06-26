<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipElevationConverter;
use PHPUnit\Framework\TestCase;


class OpenAipElevationConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "value": 3276,
            "unit": 0,
            "referenceDatum": 1
        }', true, JSON_NUMERIC_CHECK);


        $elevation = OpenAipElevationConverter::fromRest($restStr);

        $this->assertEquals(3276, $elevation->value);
        $this->assertEquals(AltitudeUnit::M, $elevation->unit);
        $this->assertEquals(AltitudeReference::MSL, $elevation->reference);
    }
}
