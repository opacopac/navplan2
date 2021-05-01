<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyOgnTrafficPosition3 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.47375,
                46.92731666666667,
                Altitude::fromMtAmsl(1230.7973664959766),
                Timestamp::fromMs(1560075379000)
            ),
            TrafficPositionMethod::FLARM,
            "Guemligen",
            Timestamp::fromMs(1560075379000)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [7.47375, 46.927317],
                "alt" => [1230.8, "M", "MSL"],
                "time" => 1560075379000
            ),
            "method" => "FLARM",
            "receiver" => "Guemligen",
            "timestamp" => 1560075379000
        );
    }
}
