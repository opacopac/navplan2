<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Flightroute\Domain\Model\Flightroute;


class DummyFlightroute2 {
    public static function create(): Flightroute {
        return new Flightroute(
            112,
            "Lausanne (Hinweg direkt)",
            new Speed(100.0, SpeedUnit::KT),
            new Consumption(36.0, ConsumptionUnit::L_PER_H),
            100,
            "circuits and then vfr to lausanne outbound route W Benzin für 3 - 4 circuits (30'), Hinweg (50'), Rückweg (65'), Alt (20'), Res (45') = 126 Liter",
            NULL,
            NULL,
            [ DummyWaypoint1::create(), DummyWaypoint2::create() ],
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 112,
            "user_id" => 13,
            "share_id" => NULL,
            "md5_hash" => NULL,
            "title" => "Lausanne (Hinweg direkt)",
            "aircraft_speed" => "100",
            "aircraft_consumption" => "36",
            "extra_fuel" => "100",
            "comments" => "circuits and then vfr to lausanne outbound route W Benzin für 3 - 4 circuits (30'), Hinweg (50'), Rückweg (65'), Alt (20'), Res (45') = 126 Liter",
        );
    }
}
