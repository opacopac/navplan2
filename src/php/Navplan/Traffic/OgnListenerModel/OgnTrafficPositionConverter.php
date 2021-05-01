<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class OgnTrafficPositionConverter {
    public static function fromDbResult(array $rs): TrafficPosition {
        $timestamp = Timestamp::fromS(intval($rs["timestampSec"]));

        return new TrafficPosition(
            new Position4d(
                floatval($rs["longitude"]),
                floatval($rs["latitude"]),
                Altitude::fromMtAmsl(floatval($rs["altitudeMeter"])),
                $timestamp
            ),
            TrafficPositionMethod::FLARM,
            $rs["receiver"],
            $timestamp
        );
    }
}
