<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Flightroute\DomainModel\Waypoint;


class DummyWaypoint1 {
    public static function create(): Waypoint {
        return new Waypoint(
            "airport",
            "124.525",
            "AD",
            "LSPN",
            "",
            FALSE,
            FALSE,
            FALSE,
            "",
            NULL,
            new Position2d(8.0781,47.2267),
            "LSPN",
            FALSE
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 659,
            "navplan_id" => 24,
            "sortorder" => 0,
            "type" => "airport",
            "freq" => "124.525",
            "callsign" => "AD",
            "checkpoint" => "LSPN",
            "alt" => "",
            "isminalt" => 0,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "",
            "supp_info" => NULL,
            "latitude" => 47.2267,
            "longitude" => 8.0781,
            "airport_icao" => "LSPN",
            "is_alternate" => 0
        );
    }


    public static function createRestArgs(): array {
        return array(
            "type" => "airport",
            "freq" => "124.525",
            "callsign" => "AD",
            "checkpoint" => "LSPN",
            "airport_icao" => "LSPN",
            "latitude" => 47.2267,
            "longitude" => 8.0781,
            "alt" => "",
            "isminalt" => 0,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "",
            "supp_info" => NULL
        );
    }
}
