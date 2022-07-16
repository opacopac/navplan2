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


    public function test_fromRest() {
        $restStr = json_decode('{
      "_id": "62614a35cb27f42509443ccd",
      "approved": true,
      "name": "AALEN-HEIDENHEIM/ELCHINGEN",
      "icaoCode": "EDPA",
      "type": 2,
      "trafficType": [
        0
      ],
      "magneticDeclination": 3.585,
      "country": "DE",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.2644,
          48.7778
        ]
      },
      "elevation": {
        "value": 584,
        "unit": 0,
        "referenceDatum": 1
      },
      "ppr": false,
      "private": false,
      "skydiveActivity": false,
      "winchOnly": false,
      "frequencies": [
        {
          "value": "121.405",
          "unit": 2,
          "type": 10,
          "name": "INFO",
          "primary": true,
          "publicUse": true,
          "_id": "62614a35cb27f42509443cce"
        },
        {
          "value": "123.155",
          "unit": 2,
          "type": 17,
          "name": "Segelflug Start",
          "primary": false,
          "publicUse": true,
          "_id": "62614a35cb27f42509443ccf"
        }
      ],
      "runways": [
        {
          "designator": "09R",
          "trueHeading": 85,
          "alignedTrueNorth": false,
          "operations": 0,
          "mainRunway": false,
          "turnDirection": 2,
          "takeOffOnly": false,
          "landingOnly": false,
          "surface": {
            "composition": [
              2
            ],
            "mainComposite": 2,
            "condition": 0,
            "mtow": {
              "value": 2.5,
              "unit": 9
            }
          },
          "dimension": {
            "length": {
              "value": 999,
              "unit": 0
            },
            "width": {
              "value": 30,
              "unit": 0
            }
          },
          "declaredDistance": {
            "tora": {
              "value": 950,
              "unit": 0
            },
            "lda": {
              "value": 950,
              "unit": 0
            }
          },
          "pilotCtrlLighting": false,
          "_id": "62614a35cb27f42509443cd0"
        },
        {
          "designator": "27L",
          "trueHeading": 265,
          "alignedTrueNorth": false,
          "operations": 0,
          "mainRunway": false,
          "turnDirection": 2,
          "takeOffOnly": false,
          "landingOnly": false,
          "surface": {
            "composition": [
              2
            ],
            "mainComposite": 2,
            "condition": 0,
            "mtow": {
              "value": 2.5,
              "unit": 9
            }
          },
          "dimension": {
            "length": {
              "value": 999,
              "unit": 0
            },
            "width": {
              "value": 30,
              "unit": 0
            }
          },
          "declaredDistance": {
            "tora": {
              "value": 950,
              "unit": 0
            },
            "lda": {
              "value": 950,
              "unit": 0
            }
          },
          "pilotCtrlLighting": false,
          "_id": "62614a35cb27f42509443cd1"
        },
        {
          "designator": "09L",
          "trueHeading": 85,
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
              "value": 10,
              "unit": 9
            }
          },
          "dimension": {
            "length": {
              "value": 1000,
              "unit": 0
            },
            "width": {
              "value": 25,
              "unit": 0
            }
          },
          "declaredDistance": {
            "tora": {
              "value": 950,
              "unit": 0
            },
            "lda": {
              "value": 950,
              "unit": 0
            }
          },
          "pilotCtrlLighting": false,
          "_id": "62614a35cb27f42509443cd2"
        },
        {
          "designator": "27R",
          "trueHeading": 265,
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
              "value": 10,
              "unit": 9
            }
          },
          "dimension": {
            "length": {
              "value": 1000,
              "unit": 0
            },
            "width": {
              "value": 25,
              "unit": 0
            }
          },
          "declaredDistance": {
            "tora": {
              "value": 950,
              "unit": 0
            },
            "lda": {
              "value": 950,
              "unit": 0
            }
          },
          "pilotCtrlLighting": false,
          "_id": "62614a35cb27f42509443cd3"
        }
      ],
      "createdAt": "2022-04-21T12:12:37.234Z",
      "updatedAt": "2022-04-21T12:12:37.282Z",
      "createdBy": "AUTO-IMPORTER",
      "updatedBy": "import-script",
      "elevationGeoid": {
        "geoidHeight": 47.98369186176001,
        "hae": 631.98369186176
      },
      "__v": 0
    }', true, JSON_NUMERIC_CHECK);


        $airport = OpenAipAirportConverter::fromRest($restStr);

        $this->assertEquals(-1, $airport->id);
        $this->assertEquals(AirportType::AF_CIVIL, $airport->type);
        $this->assertEquals("EDPA", $airport->icao);
        $this->assertEquals("AALEN-HEIDENHEIM/ELCHINGEN", $airport->name);
        $this->assertEquals("DE", $airport->country);
        $this->assertEquals(Position2d::createFromArray([10.2644, 48.7778]), $airport->position);
        $this->assertEquals(584, $airport->elevation->value);
        $this->assertEquals(AltitudeUnit::M, $airport->elevation->unit);
        $this->assertEquals(AltitudeReference::MSL, $airport->elevation->reference);
        $this->assertCount(2, $airport->radios);
        $this->assertCount(4, $airport->runways);
    }
}
