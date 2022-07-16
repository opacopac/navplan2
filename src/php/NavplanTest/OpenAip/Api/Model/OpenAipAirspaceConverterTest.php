<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\Enroute\DomainModel\AirspaceClass;
use Navplan\Enroute\DomainModel\AirspaceType;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirspaceConverter;
use PHPUnit\Framework\TestCase;


class OpenAipAirspaceConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
        "_id": "62614b355e9ded5710446b2f",
        "approved": true,
        "name": "(LGD5): INTMT",
        "type": 2,
        "icaoClass": 7,
        "onDemand": false,
        "onRequest": false,
        "byNotam": false,
        "specialAgreement": false,
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                      23.465833333333,
                      40.348888888889
                    ],
                    [
                      23.949166666667,
                      40.398888888889
                    ],
                    [
                      24.5825,
                      40.082222222222
                    ],
                    [
                      23.665833333333,
                      39.848888888889
                    ],
                    [
                      23.465833333333,
                      40.348888888889
                    ]
                ]
            ]
        },
        "country": "GR",
        "upperLimit": {
            "value": 999,
            "unit": 6,
            "referenceDatum": 2
        },
        "lowerLimit": {
            "value": 0,
            "unit": 1,
            "referenceDatum": 0
        },
        "createdAt": "2022-04-21T12:16:53.479Z",
        "updatedAt": "2022-04-21T12:16:53.492Z",
        "createdBy": "AUTO-IMPORTER",
        "updatedBy": "import-script",
        "__v": 0,
        "activity": 0
        }', true, JSON_NUMERIC_CHECK);


        $airspace = OpenAipAirspaceConverter::fromRest($restStr);

        $this->assertEquals(-1, $airspace->id);
        $this->assertEquals("(LGD5): INTMT", $airspace->name);
        $this->assertEquals("GR", $airspace->country);
        $this->assertEquals(AirspaceClass::SUA, $airspace->class);
        $this->assertEquals(AirspaceType::DANGER, $airspace->type);
        $this->assertEquals("DANGER", $airspace->category);
        $this->assertEquals(new Altitude(0, AltitudeUnit::FT, AltitudeReference::GND), $airspace->alt_bottom);
        $this->assertEquals(new Altitude(999, AltitudeUnit::FL, AltitudeReference::STD), $airspace->alt_top);
        $this->assertEquals(Ring2d::createFromArray([
            [23.465833333333, 40.348888888889],
            [23.949166666667, 40.398888888889],
            [24.5825, 40.082222222222],
            [23.665833333333, 39.848888888889],
            [23.465833333333, 40.348888888889]
        ]), $airspace->polygon);
    }
}
