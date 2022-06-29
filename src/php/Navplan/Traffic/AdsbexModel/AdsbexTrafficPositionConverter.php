<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainModel\TrafficPositionMethod;


class AdsbexTrafficPositionConverter  {
    public static function fromResponse(array $response, int $acIndex, ITimeService $timeService): TrafficPosition {
        $acResponse = $response["ac"][$acIndex];
        $isMlat = isset($acResponse["mlat"]) && count($response["ac"][$acIndex]["mlat"]) > 0;
        $lastSeenSec = isset($acResponse["seen_pos"]) ? 0 : floatval($acResponse["seen_pos"]);
        $timestamp = ($timeService->currentTimestampSec() + $lastSeenSec) * 1000;
        $alt = isset($acResponse["alt_geom"]) ? intval($acResponse["alt_geom"]) : (isset($acResponse["alt_baro"]) ? intval($acResponse["alt_baro"]) : 0);

        return new TrafficPosition(
            new Position4d(
                floatval($acResponse["lon"]),
                floatval($acResponse["lat"]),
                Altitude::fromFtAmsl($alt),
                Timestamp::fromMs($timestamp)
            ),
            $isMlat ? TrafficPositionMethod::MLAT : TrafficPositionMethod::ADSB,
            $isMlat ? "ADSBExchange (MLAT)" : "ADSBExchange (ADS-B)",
            Timestamp::fromMs(intval($response["ctime"]))
        );
    }
}
