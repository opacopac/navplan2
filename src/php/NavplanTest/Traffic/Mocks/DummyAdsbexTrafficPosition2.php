<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyAdsbexTrafficPosition2 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.2636,
                47.1468,
                new Altitude(4150, AltitudeUnit::FT, AltitudeReference::MSL),
                Timestamp::fromMs(1560000515263)
            ),
            TrafficPositionMethod::MLAT,
            "ADSBExchange (MLAT)",
            Timestamp::fromMs(1560000523926)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [7.2636, 47.1468],
                "alt" => [4150, "FT", "MSL"],
                "time" => 1560000515263
            ),
            "method" => "MLAT",
            "receiver" => "ADSBExchange (MLAT)",
            "timestamp" => 1560000523926
        );
    }
}
