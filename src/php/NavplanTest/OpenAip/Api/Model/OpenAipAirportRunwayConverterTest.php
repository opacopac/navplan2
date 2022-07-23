<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Aerodrome\DomainModel\AirportRunwayOperations;
use Navplan\Common\DomainModel\Length;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirportRunwayConverter;
use PHPUnit\Framework\TestCase;


class OpenAipAirportRunwayConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "designator": "07",
            "trueHeading": 66,
            "alignedTrueNorth": false,
            "operations": 0,
            "mainRunway": true,
            "turnDirection": 2,
            "takeOffOnly": false,
            "landingOnly": false,
            "surface": {
                "composition": [
                    0
                ],
                "mainComposite": 0,
                "condition": 0,
                "mtow": {
                    "value": 3,
                    "unit": 9
                }
            },
            "dimension": {
                "length": {
                    "value": 1160,
                    "unit": 0
                },
                "width": {
                    "value": 18,
                    "unit": 0
                }
            },
            "declaredDistance": {
                "tora": {
                    "value": 947,
                    "unit": 0
                },
                "lda": {
                    "value": 947,
                    "unit": 0
                }
            },
            "pilotCtrlLighting": false,
            "visualApproachAids": [
                1
            ],
            "_id": "62614a351eacded7b7bbdc9e"
        }', true, JSON_NUMERIC_CHECK);


        $rwy = OpenAipAirportRunwayConverter::fromRest($restStr);

        $this->assertEquals("07", $rwy->name);
        $this->assertEquals(66, $rwy->direction);
        $this->assertEquals(Length::fromM(1160), $rwy->length);
        $this->assertEquals(Length::fromM(18), $rwy->width);
        $this->assertEquals(Length::fromM(947), $rwy->tora);
        $this->assertEquals(Length::fromM(947), $rwy->lda);
        $this->assertEquals(true, $rwy->papi);
        $this->assertEquals(AirportRunwayOperations::ACTIVE, $rwy->operations);
    }
}
