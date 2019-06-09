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


class DummyAdsbexTrafficPosition3 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.100327,
                46.645947,
                new Altitude(24263, AltitudeUnit::FT, AltitudeReference::MSL),
                Timestamp::fromMs(1560000518739)
            ),
            TrafficDataSource::ADSBX2,
            TrafficPositionMethod::ADSB,
            "ADSBExchange (ADS-B)",
            Timestamp::fromMs(1560000523926)
        );
    }
}
