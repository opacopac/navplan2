<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


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
