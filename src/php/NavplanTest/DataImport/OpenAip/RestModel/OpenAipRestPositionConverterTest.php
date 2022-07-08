<?php declare(strict_types=1);

namespace NavplanTest\DataImport\OpenAip\RestModel;

use Navplan\DataImport\OpenAip\RestModel\OpenAipRestPositionConverter;
use PHPUnit\Framework\TestCase;


class OpenAipRestPositionConverterTest extends TestCase {
    public function test_fromRestCoordinates() {
        $restStr = json_decode('[
            -60.83352756210572,
            11.147421569596954
        ]', true, JSON_NUMERIC_CHECK);


        $position2d = OpenAipRestPositionConverter::fromRestCoordinates($restStr);

        $this->assertEquals(-60.83352756210572, $position2d->longitude);
        $this->assertEquals(11.147421569596954, $position2d->latitude);
    }


    public function test_fromRestGeometry() {
        $restStr = json_decode('{
            "type": "Point",
            "coordinates": [
              -60.83352756210572,
              11.147421569596954
            ]
        }', true, JSON_NUMERIC_CHECK);


        $position2d = OpenAipRestPositionConverter::fromRestGeometry($restStr);

        $this->assertEquals(-60.83352756210572, $position2d->longitude);
        $this->assertEquals(11.147421569596954, $position2d->latitude);
    }
}
