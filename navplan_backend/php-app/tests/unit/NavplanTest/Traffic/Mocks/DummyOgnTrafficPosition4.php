<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;
use Navplan\Traffic\Domain\Model\TrafficPosition;
use Navplan\Traffic\Domain\Model\TrafficPositionMethod;


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
