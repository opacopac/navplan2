<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoSma\Domain\Model\SmaStation;
use SwissTopo\SwissTopoWrapper;


class SmaStationParser {
    public static function fromJson(array $smaStationJson): SmaStation {
        return new SmaStation(
            $smaStationJson["id"],
            $smaStationJson["properties"]["station_name"],
            self::parsePosition($smaStationJson["geometry"]["coordinates"]),
            self::parseAltitude($smaStationJson["properties"]["altitude"])
        );
    }


    private static function parsePosition(array $coordinates_ch): Position2d {
        $chY = floatval($coordinates_ch[0]);
        $chX = floatval($coordinates_ch[1]);
        $lon = round(SwissTopoWrapper::ChToWgsLong($chY, $chX), 5);
        $lat = round(SwissTopoWrapper::ChToWgsLat($chY, $chX), 5);

        return new Position2d($lon, $lat);
    }


    private static function parseAltitude(string $alt_m): Altitude {
        $altValue = round(floatval($alt_m), 1);

        return Altitude::fromMtAmsl($altValue);
    }
}
