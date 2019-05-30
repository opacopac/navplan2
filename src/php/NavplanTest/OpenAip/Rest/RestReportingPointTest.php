<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\Rest\RestReportingPoint;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use PHPUnit\Framework\TestCase;


class RestReportingPointTest extends TestCase {
    public function test_toArray_ReportingPoint() {
        $rep = DummyReportingPoint1::create();
        $repRest = RestReportingPoint::toArray($rep);

        $this->assertEquals($rep->id, $repRest["id"]);
        $this->assertEquals($rep->type, $repRest["type"]);
        $this->assertEquals($rep->airport_icao, $repRest["airport_icao"]);
        $this->assertEquals($rep->name, $repRest["name"]);
        $this->assertEquals($rep->heli, $repRest["heli"]);
        $this->assertEquals($rep->inbd_comp, $repRest["inbd_comp"]);
        $this->assertEquals($rep->outbd_comp, $repRest["outbd_comp"]);
        $this->assertEquals($rep->min_ft, $repRest["min_ft"]);
        $this->assertEquals($rep->max_ft, $repRest["max_ft"]);
        $this->assertEquals($rep->position->latitude, $repRest["latitude"]);
        $this->assertEquals($rep->position->longitude, $repRest["longitude"]);
        $this->assertEquals($rep->polygon, $repRest["polygon"]);
    }
}
