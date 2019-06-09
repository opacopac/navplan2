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


class DummyAdsbexTrafficPosition1 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.5765005,
                46.8340001,
                new Altitude(3375, AltitudeUnit::FT, AltitudeReference::MSL),
                Timestamp::fromMs(1560000429704)
            ),
            TrafficDataSource::ADSBX2,
            TrafficPositionMethod::MLAT,
            "ADSBExchange (MLAT)",
            Timestamp::fromMs(1560000523926)
        );
    }
}
