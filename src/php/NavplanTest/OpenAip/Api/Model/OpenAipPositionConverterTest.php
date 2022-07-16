<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\OpenAip\ApiAdapter\Model\OpenAipPositionConverter;
use PHPUnit\Framework\TestCase;


class OpenAipPositionConverterTest extends TestCase {
    public function test_fromRestCoordinates() {
        $restStr = json_decode('[
            -60.83352756210572,
            11.147421569596954
        ]', true, JSON_NUMERIC_CHECK);


        $position2d = OpenAipPositionConverter::fromRestCoordinates($restStr);

        $this->assertEquals(-60.83352756210572, $position2d->longitude);
        $this->assertEquals(11.147421569596954, $position2d->latitude);
    }


    public function test_fromRestPointGeometry() {
        $restStr = json_decode('{
            "type": "Point",
            "coordinates": [
              -60.83352756210572,
              11.147421569596954
            ]
        }', true, JSON_NUMERIC_CHECK);


        $position2d = OpenAipPositionConverter::fromRestPointGeometry($restStr);

        $this->assertEquals(-60.83352756210572, $position2d->longitude);
        $this->assertEquals(11.147421569596954, $position2d->latitude);
    }
}
