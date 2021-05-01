<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyOgnTrafficPosition5 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                8.3049,
                47.0623,
                Altitude::fromMtAmsl(790.6608144355035),
                Timestamp::fromMs(1560075380000)
            ),
            TrafficPositionMethod::FLARM,
            "Rigi",
            Timestamp::fromMs(1560075380000)
        );
    }
}
