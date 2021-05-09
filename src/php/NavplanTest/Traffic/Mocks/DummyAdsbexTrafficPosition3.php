<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyAdsbexTrafficPosition3 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.100327,
                46.645947,
                Altitude::fromFtAmsl(24263),
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
