<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexRepo;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position4d;
use Navplan\Geometry\Domain\Timestamp;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;


class AdsbexRepoTrafficPosition  {
    public static function fromResponse(array $response, int $acIndex): TrafficPosition {
        $acResponse = $response["ac"][$acIndex];
        return new TrafficPosition(
            new Position4d(
                floatval($acResponse["lon"]),
                floatval($acResponse["lat"]),
                new Altitude(intval($acResponse["galt"]), AltitudeUnit::FT, AltitudeReference::MSL),
                Timestamp::fromMs(intval($acResponse["postime"]))
            ),
            $acResponse["mlat"] === "1" ? TrafficPositionMethod::MLAT : TrafficPositionMethod::ADSB,
            $acResponse["mlat"] === "1" ? "ADSBExchange (MLAT)" : "ADSBExchange (ADS-B)",
            Timestamp::fromMs(intval($response["ctime"]))
        );
    }
}
