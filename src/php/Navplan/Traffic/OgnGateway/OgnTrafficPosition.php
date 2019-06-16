<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnGateway;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position4d;
use Navplan\Geometry\Domain\Timestamp;
use Navplan\System\UseCase\ITimeService;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;


class OgnTrafficPosition {
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
