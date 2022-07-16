<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Aerodrome\DomainModel\AirportType;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipAirportConverter;
use PHPUnit\Framework\TestCase;


class OpenAipAirportConverterTest extends TestCase {
    public function test_fromRest_no_icao_no_freq_no_rwy() {
        $restStr = json_decode('{
            "_id": "62614a341eacded7b7bbdc95",
            "approved": true,
            "name": "AACHEN",
            "type": 7,
            "trafficType": [
                0
            ],
            "magneticDeclination": 2.472,
            "country": "DE",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.0444444444444,
                    50.775555555556
                ]
            },
            "elevation": {
                "value": 208,
                "unit": 0,
                "referenceDatum": 1
            },
            "ppr": false,
            "private": false,
            "skydiveActivity": false,
            "winchOnly": false,
            "createdAt": "2022-04-21T12:12:36.971Z",
            "updatedAt": "2022-04-21T12:12:36.987Z",
            "createdBy": "AUTO-IMPORTER",
            "updatedBy": "import-script",
            "elevationGeoid": {
                "geoidHeight": 46.49454933333158,
                "hae": 254.49454933333158
            },
            "__v": 0
        }', true, JSON_NUMERIC_CHECK);


        $airport = OpenAipAirportConverter::fromRest($restStr);

        $this->assertEquals(-1, $airport->id);
        $this->assertEquals(AirportType::HELI_CIVIL, $airport->type);
        $this->assertEquals(null, $airport->icao);
        $this->assertEquals("AACHEN", $airport->name);
        $this->assertEquals("DE", $airport->country);
        $this->assertEquals(Position2d::createFromArray([6.0444444444444, 50.775555555556]), $airport->position);
        $this->assertEquals(208, $airport->elevation->value);
        $this->assertEquals(AltitudeUnit::M, $airport->elevation->unit);
        $this->assertEquals(AltitudeReference::MSL, $airport->elevation->reference);
    }
}
