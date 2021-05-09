<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class DummyOgnTrafficPosition4 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.47375,
                46.9273,
                Altitude::fromMtAmsl(1228.663740551085),
                Timestamp::fromMs(1560075379000)
            ),
            TrafficPositionMethod::FLARM,
            "LSTBSE",
            Timestamp::fromMs(1560075379000)
        );
    }
}
