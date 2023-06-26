<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\Traffic\Domain\Model\TrafficPosition;
use Navplan\Traffic\Domain\Model\TrafficPositionMethod;


class DummyOgnTrafficPosition1 {
    public static function create(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                8.303566666666667,
                47.06271666666667,
                Altitude::fromMtAmsl(792.794440380395),
                Timestamp::fromMs(1560075378000)
            ),
            TrafficPositionMethod::FLARM,
            "Rigi",
            Timestamp::fromMs(1560075378000)
        );
    }


    public static function createRest(): array {
        return array(
            "position" => array(
                "pos" => [8.303567, 47.062717],
                "alt" => [792.8, "M", "MSL"],
                "time" => 1560075378000
            ),
            "method" => "FLARM",
            "receiver" => "Rigi",
            "timestamp" => 1560075378000
        );
    }
}
