<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\Domain\Waypoint;
use Navplan\Flightroute\RestModel\WaypointConverter;
use NavplanTest\Flightroute\Mocks\DummyWaypoint1;
use PHPUnit\Framework\TestCase;


class RestWaypointTest extends TestCase {
    private function assertEqualRestValues(array $wpRest, Waypoint $wp) {
        $this->assertEquals($wp->type, $wpRest["type"]);
        $this->assertEquals($wp->frequency, $wpRest["freq"]);
        $this->assertEquals($wp->callsign, $wpRest["callsign"]);
        $this->assertEquals($wp->checkpoint, $wpRest["checkpoint"]);
        $this->assertEquals($wp->airportIcao, $wpRest["airport_icao"]);
        $this->assertEquals($wp->position->latitude, $wpRest["latitude"]);
        $this->assertEquals($wp->position->longitude, $wpRest["longitude"]);
        $this->assertEquals($wp->altitude, $wpRest["alt"]);
        $this->assertEquals($wp->isMinAlt, $wpRest["isminalt"]);
        $this->assertEquals($wp->isMaxAlt, $wpRest["ismaxalt"]);
        $this->assertEquals($wp->isAltAtLegStart, $wpRest["isaltatlegstart"]);
        $this->assertEquals($wp->remark, $wpRest["remark"]);
        $this->assertEquals($wp->suppInfo, $wpRest["supp_info"]);
    }


    public function test_fromArgs() {
        $wpRest = DummyWaypoint1::createRestArgs();
        $wp = WaypointConverter::fromArgs($wpRest);

        $this->assertEqualRestValues($wpRest, $wp);
    }


    public function test_toArray() {
        $wp = DummyWaypoint1::create();
        $wpRest = WaypointConverter::toArray($wp);

        $this->assertEqualRestValues($wpRest, $wp);
    }
}
