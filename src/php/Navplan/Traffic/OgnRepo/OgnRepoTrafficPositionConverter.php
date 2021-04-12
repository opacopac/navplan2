<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnRepo;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class OgnRepoTrafficPositionConverter {
    public static function fromDumpFileLine(string $line, ITimeService $timeService): TrafficPosition {
        $msg = json_decode($line, true);
        $time = $timeService->strtotime($msg["time"] . " UTC");
        $timestamp = Timestamp::fromS($time);

        return new TrafficPosition(
            new Position4d(
                floatval($msg["longitude"]),
                floatval($msg["latitude"]),
                new Altitude(floatval($msg["altitude"]), AltitudeUnit::M, AltitudeReference::MSL),
                $timestamp
            ),
            TrafficPositionMethod::FLARM,
            $msg["receiver"],
            $timestamp
        );
    }
}
