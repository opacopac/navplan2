<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Flightroute\Domain\Model\Flightroute;


class DummyFlightroute1 {
    public static function create(): Flightroute {
        return new Flightroute(
            24,
            "Triengen-Bern via Transit South",
            new Speed(100.0, SpeedUnit::KT),
            new Consumption(20.0, ConsumptionUnit::L_PER_H),
            0,
            "",
            NULL,
            NULL,
            [ DummyWaypoint1::create(), DummyWaypoint2::create() ],
            DummyWaypoint3::create()
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 24,
            "user_id" => 4,
            "share_id" => NULL,
            "md5_hash" => NULL,
            "title" => "Triengen-Bern via Transit South",
            "aircraft_speed" => "100",
            "aircraft_consumption" => "20",
            "extra_fuel" => "0",
            "comments" => "",
        );
    }


    public static function createRestArgs(): array {
        return array(
            "id" => 24,
            "title" => "Triengen-Bern via Transit South",
            "aircraft_speed" => "100",
            "aircraft_consumption" => "20",
            "extra_fuel" => "0",
            "comments" => "",
            "waypoints" => [DummyWaypoint1::createRestArgs(), DummyWaypoint2::createRestArgs()],
            "alternate" => DummyWaypoint3::createRestArgs()
        );
    }
}
