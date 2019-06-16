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


class DummyOgnTrafficPosition3 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.47375,
                46.92731666666667,
                new Altitude(1230.7973664959766, AltitudeUnit::M, AltitudeReference::MSL),
                Timestamp::fromMs(1560075379000)
            ),
            TrafficDataSource::OGN,
            TrafficPositionMethod::FLARM,
            "Guemligen",
            Timestamp::fromMs(1560075379000)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [7.47375, 46.927317],
                "alt" => [1230.8, "M", "MSL"],
                "time" => 1560075379000
            ),
            "source" => "OGN",
            "method" => "FLARM",
            "receiver" => "Guemligen",
            "timestamp" => 1560075379000
        );
    }
}
