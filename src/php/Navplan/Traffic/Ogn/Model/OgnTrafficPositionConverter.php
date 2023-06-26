<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;
use Navplan\Traffic\Domain\Model\TrafficPosition;
use Navplan\Traffic\Domain\Model\TrafficPositionMethod;


class OgnTrafficPositionConverter {
    public static function fromDbRow(array $row): TrafficPosition {
        $timestamp = Timestamp::fromS(intval($row["timestampSec"]));

        return new TrafficPosition(
            new Position4d(
                floatval($row["longitude"]),
                floatval($row["latitude"]),
                Altitude::fromMtAmsl(floatval($row["altitudeMeter"])),
                $timestamp
            ),
            TrafficPositionMethod::FLARM,
            $row["receiver"],
            $timestamp
        );
    }
}
