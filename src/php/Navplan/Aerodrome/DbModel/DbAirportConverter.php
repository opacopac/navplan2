<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\Airport;
use Navplan\Aerodrome\DomainModel\AirportType;
use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\GeoHelper;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;


class DbAirportConverter {
    public const TABLE_NAME = "openaip_airports2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_ICAO = "icao";
    public const COL_COUNTRY = "country";
    public const COL_LONGITUDE = "longitude";
    public const COL_LATITUDE = "latitude";
    public const COL_ELEVATION = "elevation";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";


    public static function fromDbRow(array $row): Airport {
        return new Airport(
            intval($row[self::COL_ID]),
            AirportType::from($row[self::COL_TYPE]),
            $row[self::COL_NAME],
            $row[self::COL_ICAO] !== "" ? $row[self::COL_ICAO] : NULL,
            $row[self::COL_COUNTRY],
            DbPosition2dConverter::fromDbRow($row, self::COL_LONGITUDE, self::COL_LATITUDE),
            new Altitude(floatval($row[self::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL),
            [],
            [],
            [],
            [],
            [],
            []
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . self::TABLE_NAME . " (" . join(", ", [
                self::COL_TYPE,
                self::COL_NAME,
                self::COL_ICAO,
                self::COL_COUNTRY,
                self::COL_LONGITUDE,
                self::COL_LATITUDE,
                self::COL_ELEVATION,
                self::COL_GEOHASH,
                self::COL_LONLAT
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
