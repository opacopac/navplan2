<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Flightroute\Domain\Waypoint;


class DummyWaypoint2 {
    public static function create(): Waypoint {
        return new Waypoint(
            "navaid",
            "110.85",
            "FRI",
            "FRI VOR-DME",
            "6000",
            TRUE,
            FALSE,
            FALSE,
            "WIL R228, 127.325",
            NULL,
            new Position2d(7.22361,46.7775),
            NULL,
            FALSE
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 662,
            "navplan_id" => 24,
            "sortorder" => 0,
            "type" => "navaid",
            "freq" => "110.85",
            "callsign" => "FRI",
            "checkpoint" => "FRI VOR-DME",
            "alt" => "6000",
            "isminalt" => 1,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "WIL R228, 127.325",
            "supp_info" => NULL,
            "latitude" => 46.7775,
            "longitude" => 7.22361,
            "airport_icao" => NULL,
            "is_alternate" => 0
        );
    }


    public static function createRestArgs(): array {
        return array(
            "type" => "navaid",
            "freq" => "110.85",
            "callsign" => "FRI",
            "checkpoint" => "FRI VOR-DME",
            "airport_icao" => NULL,
            "latitude" => 46.7775,
            "longitude" => 7.22361,
            "alt" => "6000",
            "isminalt" => 1,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "WIL R228, 127.325",
            "supp_info" => NULL
        );
    }
}
