<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\DomainModel\Position2d;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipPolygonConverter;
use PHPUnit\Framework\TestCase;


class OpenAipPolygonConverterTest extends TestCase {
    public function test_fromRestCoordinatesList() {
        $restStr = json_decode('[
          [
            [
              19.85,
              39.833333333333
            ],
            [
              19.866666666667,
              39.816666666667
            ],
            [
              19.733333333333,
              39.716666666667
            ],
            [
              19.633333333333,
              39.766666666667
            ],
            [
              19.85,
              39.833333333333
            ]
          ]
        ]', true, JSON_NUMERIC_CHECK);

        $ring2d = OpenAipPolygonConverter::fromRestCoordinatesList($restStr);

        $this->assertCount(5, $ring2d->position2dList);
        $this->assertEquals(new Position2d(19.85, 39.833333333333), $ring2d->position2dList[0]);
        $this->assertEquals(new Position2d(19.866666666667, 39.816666666667), $ring2d->position2dList[1]);
        $this->assertEquals(new Position2d(19.733333333333, 39.716666666667), $ring2d->position2dList[2]);
        $this->assertEquals(new Position2d(19.633333333333, 39.766666666667), $ring2d->position2dList[3]);
        $this->assertEquals(new Position2d(19.85, 39.833333333333), $ring2d->position2dList[4]);
    }


    public function test_fromRestPolygonGeometry() {
        $restStr = json_decode('{
        "type": "Polygon",
        "coordinates": [
          [
            [
              19.85,
              39.833333333333
            ],
            [
              19.866666666667,
              39.816666666667
            ],
            [
              19.733333333333,
              39.716666666667
            ],
            [
              19.633333333333,
              39.766666666667
            ],
            [
              19.85,
              39.833333333333
            ]
          ]
        ]
      }', true, JSON_NUMERIC_CHECK);


        $ring2d = OpenAipPolygonConverter::fromRestPolygonGeometry($restStr);

        $this->assertCount(5, $ring2d->position2dList);
        $this->assertEquals(new Position2d(19.85, 39.833333333333), $ring2d->position2dList[0]);
        $this->assertEquals(new Position2d(19.866666666667, 39.816666666667), $ring2d->position2dList[1]);
        $this->assertEquals(new Position2d(19.733333333333, 39.716666666667), $ring2d->position2dList[2]);
        $this->assertEquals(new Position2d(19.633333333333, 39.766666666667), $ring2d->position2dList[3]);
        $this->assertEquals(new Position2d(19.85, 39.833333333333), $ring2d->position2dList[4]);
    }
}
