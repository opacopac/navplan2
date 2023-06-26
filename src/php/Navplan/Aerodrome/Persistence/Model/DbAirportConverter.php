<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\AirportType;
use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\GeoHelper;
use Navplan\System\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\IDbService;


class DbAirportConverter {
    public static function fromDbRow(array $row): Airport {
        return new Airport(
            intval($row[DbTableAirport::COL_ID]),
            AirportType::from($row[DbTableAirport::COL_TYPE]),
            $row[DbTableAirport::COL_NAME],
            $row[DbTableAirport::COL_ICAO] !== "" ? $row[DbTableAirport::COL_ICAO] : NULL,
            $row[DbTableAirport::COL_COUNTRY],
            DbPosition2dConverter::fromDbRow($row, DbTableAirport::COL_LONGITUDE, DbTableAirport::COL_LATITUDE),
            new Altitude(floatval($row[DbTableAirport::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL),
            [],
            [],
            [],
            [],
            [],
            []
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . DbTableAirport::TABLE_NAME . " (" . join(", ", [
                DbTableAirport::COL_TYPE,
                DbTableAirport::COL_NAME,
                DbTableAirport::COL_ICAO,
                DbTableAirport::COL_COUNTRY,
                DbTableAirport::COL_LONGITUDE,
                DbTableAirport::COL_LATITUDE,
                DbTableAirport::COL_ELEVATION,
                DbTableAirport::COL_GEOHASH,
                DbTableAirport::COL_LONLAT
            ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(Airport $airport, IDbStatement $insertStatement) {
        $type = $airport->type->value;
        $elevation = $airport->elevation->getHeightAmsl()->getM();
        $geoHash = GeoHelper::calcGeoHash($airport->position->longitude, $airport->position->latitude, 14); // TODO
        $lonlat = "POINT(" . $airport->position->longitude . " " . $airport->position->latitude . ")";

        $insertStatement->bind_param("ssssdddss",
            $type,
            $airport->name,
            $airport->icao,
            $airport->country,
            $airport->position->longitude,
            $airport->position->latitude,
            $elevation,
            $geoHash,
            $lonlat
        );
    }
}
