<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyOgnTrafficPosition2 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.730933333333334,
                47.17738333333333,
                Altitude::fromMtAmsl(548.951475249939),
                Timestamp::fromMs(1560075378000)
            ),
            TrafficPositionMethod::FLARM,
            "LSPL",
            Timestamp::fromMs(1560075378000)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [7.730933, 47.177383],
                "alt" => [549.0, "M", "MSL"],
                "time" => 1560075378000
            ),
            "method" => "FLARM",
            "receiver" => "LSPL",
            "timestamp" => 1560075378000
        );
    }
}
