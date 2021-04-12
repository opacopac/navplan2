<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyOgnTrafficPosition4 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.47375,
                46.9273,
                new Altitude(1228.663740551085, AltitudeUnit::M, AltitudeReference::MSL),
                Timestamp::fromMs(1560075379000)
            ),
            TrafficPositionMethod::FLARM,
            "LSTBSE",
            Timestamp::fromMs(1560075379000)
        );
    }
}
