<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Flightroute\Domain\Model\Flightroute;


class DummyFlightroute3 {
    public static function create(): Flightroute {
        return new Flightroute(
            320,
            "Lausanne (Hinweg direkt)",
            new Speed(100.0, SpeedUnit::KT),
            new Consumption(20.0, ConsumptionUnit::L_PER_H),
            0,
            NULL,
            "tmznysi1u9",
            "10f60c0937c2e90b3fececd38a443987",
            [ DummyWaypoint1::create() ],
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 320,
            "user_id" => NULL,
            "share_id" => "tmznysi1u9",
            "md5_hash" => "10f60c0937c2e90b3fececd38a443987",
            "title" => "LSZH - LOWI via Arlbergpass",
            "aircraft_speed" => "100",
            "aircraft_consumption" => "20",
            "extra_fuel" => "",
            "comments" => NULL,
        );
    }
}
