<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Flightroute\Domain\Model\Waypoint;


class DummyWaypoint3 {
    public static function create(): Waypoint {
        return new Waypoint(
            "airport",
            "120.1",
            "TWR",
            "LSZG",
            "",
            FALSE,
            FALSE,
            FALSE,
            "",
            "ELEV:1411ft RWY:07/25,07R/25L,07L/25R TWR:120.1 GND:121.8 ATIS:121.1",
            new Position2d(7.41639,47.1814),
            "LSZG",
            TRUE
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 12325,
            "navplan_id" => 490,
            "sortorder" => 5,
            "type" => "airport",
            "freq" => "120.1",
            "callsign" => "TWR",
            "checkpoint" => "LSZG",
            "alt" => "",
            "isminalt" => 0,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "",
            "supp_info" => "ELEV:1411ft RWY:07/25,07R/25L,07L/25R TWR:120.1 GND:121.8 ATIS:121.1",
            "latitude" => 47.1814,
            "longitude" => 7.41639,
            "airport_icao" => "LSZG",
            "is_alternate" => 1
        );
    }


    public static function createRestArgs(): array {
        return array(
            "type" => "airport",
            "freq" => "120.1",
            "callsign" => "TWR",
            "checkpoint" => "LSZG",
            "airport_icao" => "LSZG",
            "latitude" => 47.1814,
            "longitude" => 7.41639,
            "alt" => "",
            "isminalt" => 0,
            "ismaxalt" => 0,
            "isaltatlegstart" => 0,
            "remark" => "",
            "supp_info" => "ELEV:1411ft RWY:07/25,07R/25L,07L/25R TWR:120.1 GND:121.8 ATIS:121.1"
        );
    }
}
