<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Enroute\Domain\Model\NavaidType;
use Navplan\OpenAip\ApiAdapter\Model\OpenAipNavaidConverter;
use PHPUnit\Framework\TestCase;


class OpenAipNavaidConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "_id": "62616c96abdcc7f0ccbbe519",
            "approved": true,
            "name": "CORVATSCH",
            "identifier": "CVA",
            "type": 0,
            "country": "CH",
            "channel": "57Y",
            "frequency": {
                "value": "112.050",
                "unit": 2
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                  9.8216666666667,
                  46.418055555556
                ]
            },
            "elevation": {
                "value": 3276,
                "unit": 0,
                "referenceDatum": 1
            },
            "magneticDeclination": 3.318842895371584,
            "alignedTrueNorth": false,
            "createdAt": "2022-04-21T14:39:18.436Z",
            "updatedAt": "2022-04-21T14:39:18.469Z",
            "createdBy": "import-script",
            "updatedBy": "import-script",
            "elevationGeoid": {
                "geoidHeight": 51.923554999999254,
                "hae": 3327.9235549999994
            },
            "__v": 0
        }', true, JSON_NUMERIC_CHECK);


        $navaid = OpenAipNavaidConverter::fromRest($restStr);

        $this->assertEquals(-1, $navaid->id);
        $this->assertEquals(NavaidType::DME, $navaid->type);
        $this->assertEquals("CVA", $navaid->kuerzel);
        $this->assertEquals("CORVATSCH", $navaid->name);
        $this->assertEquals(Position2d::createFromArray([9.8216666666667, 46.418055555556]), $navaid->position);
        $this->assertEquals(3276, $navaid->elevation->value);
        $this->assertEquals(AltitudeUnit::M, $navaid->elevation->unit);
        $this->assertEquals(AltitudeReference::MSL, $navaid->elevation->reference);
        $this->assertEquals(112.050, $navaid->frequency->value);
        $this->assertEquals(FrequencyUnit::MHZ, $navaid->frequency->unit);
        $this->assertEquals(3.318842895371584, $navaid->declination);
        $this->assertEquals(false, $navaid->isTrueNorth);
    }
}
