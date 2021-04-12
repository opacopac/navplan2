<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexRepo;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class AdsbexRepoTrafficPositionConverter  {
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
