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


class DummyOgnTrafficPosition1 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                8.303566666666667,
                47.06271666666667,
                new Altitude(792.794440380395, AltitudeUnit::M, AltitudeReference::MSL),
                Timestamp::fromMs(1560075378000)
            ),
            TrafficDataSource::OGN,
            TrafficPositionMethod::FLARM,
            "Rigi",
            Timestamp::fromMs(1560075378000)
        );
    }
}
