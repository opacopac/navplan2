<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DbRepo;

use InvalidArgumentException;
use Navplan\Db\UseCase\IDbService;
use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\MeteoSma\Domain\SmaStation;


class DbSmaStation {
    public static function fromDbResult(array $rs): SmaStation {
        return new SmaStation(
            $rs["station_id"],
            $rs["station_name"],
            self::getPosition($rs),
            self::getAltitude($rs)
        );
    }


    public static function toInsertQuery(IDbService $dbService, SmaStation $smaStation): string {
        if ($smaStation->altitude->unit !== AltitudeUnit::M || $smaStation->altitude->reference !== AltitudeReference::MSL) {
            throw new InvalidArgumentException("invalid unit or reference for altitude of sma station!");
        }

        $query = "INSERT INTO meteo_sma_stations";
        $query .= " (station_id, name, latitude, longitude, altitude_m)";
        $query .= " VALUES (";
        $query .= " '" . $dbService->escapeString($smaStation->id) . "',";
        $query .= " '" . $dbService->escapeString($smaStation->name) . "',";
        $query .= " " . $smaStation->position->latitude . ",";
        $query .= " " . $smaStation->position->longitude . ",";
        $query .= " " . $smaStation->altitude->value;
        $query .= ")";

        return $query;
    }


    private static function getPosition(array $rs): Position2d {
        return new Position2d(
            floatval($rs["station_lon"]),
            floatval($rs["station_lat"])
        );
    }


    private static function getAltitude(array $rs): Altitude {
        return new Altitude(
            intval($rs["station_alt_m"]),
            AltitudeUnit::M,
            AltitudeReference::MSL
        );
    }
}
