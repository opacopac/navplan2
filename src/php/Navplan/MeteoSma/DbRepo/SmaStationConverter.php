<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DbRepo;

use InvalidArgumentException;
use Navplan\Db\DomainService\IDbService;
use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\MeteoSma\DomainModel\SmaStation;


class SmaStationConverter {
    public static function fromDbResult(array $rs): SmaStation {
        return new SmaStation(
            $rs["station_id"],
            $rs["station_name"],
            new Position2d(
                floatval($rs["station_lon"]),
                floatval($rs["station_lat"])
            ),
            Altitude::fromMtAmsl(intval($rs["station_alt_m"]))
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
}
