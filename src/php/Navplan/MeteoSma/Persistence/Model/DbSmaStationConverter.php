<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Persistence\Model;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoSma\Domain\Model\SmaStation;
use Navplan\System\DomainService\IDbService;


class DbSmaStationConverter {
    public static function fromDbRow(array $row): SmaStation {
        return new SmaStation(
            $row["station_id"],
            $row["station_name"],
            new Position2d(
                floatval($row["station_lon"]),
                floatval($row["station_lat"])
            ),
            Altitude::fromMtAmsl(intval($row["station_alt_m"]))
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
