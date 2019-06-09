<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position4d;
use Navplan\Geometry\Domain\Timestamp;
use Navplan\Traffic\Domain\TrafficDataSource;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;


class DummyOgnTrafficPosition5 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                8.3049,
                47.0623,
                new Altitude(790.6608144355035, AltitudeUnit::M, AltitudeReference::MSL),
                Timestamp::fromMs(1560075380000)
            ),
            TrafficDataSource::OGN,
            TrafficPositionMethod::FLARM,
            "Rigi",
            Timestamp::fromMs(1560075380000)
        );
    }
}
