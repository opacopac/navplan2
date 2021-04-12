<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyAdsbexTrafficPosition3 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.100327,
                46.645947,
                new Altitude(24263, AltitudeUnit::FT, AltitudeReference::MSL),
                Timestamp::fromMs(1560000518739)
            ),
            TrafficPositionMethod::ADSB,
            "ADSBExchange (ADS-B)",
            Timestamp::fromMs(1560000523926)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [7.100327, 46.645947],
                "alt" => [24263, "FT", "MSL"],
                "time" => 1560000518739
            ),
            "method" => "ADSB",
            "receiver" => "ADSBExchange (ADS-B)",
            "timestamp" => 1560000523926
        );
    }
}
