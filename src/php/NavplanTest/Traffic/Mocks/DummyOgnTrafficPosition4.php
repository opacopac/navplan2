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


class DummyOgnTrafficPosition4 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.47375,
                46.9273,
                new Altitude(1228.663740551085, AltitudeUnit::M, AltitudeReference::MSL),
                Timestamp::fromMs(1560075379000)
            ),
            TrafficDataSource::OGN,
            TrafficPositionMethod::FLARM,
            "LSTBSE",
            Timestamp::fromMs(1560075379000)
        );
    }
}
