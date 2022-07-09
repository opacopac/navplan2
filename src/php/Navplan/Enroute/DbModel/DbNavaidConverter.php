<?php declare(strict_types=1);

namespace Navplan\Enroute\DbModel;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\DomainModel\Navaid;
use Navplan\Enroute\DomainModel\NavaidType;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;


class DbNavaidConverter {
    public const TABLE_NAME = "openaip_navaids2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_KUERZEL = "kuerzel";
    public const COL_NAME = "name";
    public const COL_LONGITUDE = "longitude";
    public const COL_LATITUDE = "latitude";
    public const COL_ELEVATION = "elevation";
    public const COL_FREQUENCY = "frequency";
    public const COL_DECLINATION = "declination";
    public const COL_TRUENORTH = "truenorth";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";


    public static function fromDbRow(array $row): Navaid {
        return new Navaid(
            intval($row[self::COL_ID]),
            NavaidType::from($row[self::COL_TYPE]),
            $row[self::COL_KUERZEL],
            $row[self::COL_NAME],
            DbPosition2dConverter::fromDbRow($row),
            new Altitude(floatval($row[self::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL),
            new Frequency(floatval($row[self::COL_FREQUENCY]), $row[self::COL_TYPE] === "NDB" ? FrequencyUnit::KHZ : FrequencyUnit::MHZ),
            floatval($row[self::COL_DECLINATION]),
            boolval($row[self::COL_TRUENORTH])
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . self::TABLE_NAME . " (" . join(", ", [
            self::COL_TYPE,
            self::COL_KUERZEL,
            self::COL_NAME,
            self::COL_LONGITUDE,
            self::COL_LATITUDE,
            self::COL_ELEVATION,
            self::COL_FREQUENCY,
            self::COL_DECLINATION,
            self::COL_TRUENORTH,
            self::COL_GEOHASH,
            self::COL_LONLAT
        ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(Navaid $navaid, IDbStatement $insertStatement) {
        $type = $navaid->type->value;
        $elevation = $navaid->elevation->getHeightAmsl()->getM();
        $geoHash = GeoHelper::calcGeoHash($navaid->position->longitude, $navaid->position->latitude, 14); // TODO
        $lonlat = "POINT(" . $navaid->position->longitude . " " . $navaid->position->latitude . ")";
        $insertStatement->bind_param("sssdddsdiss",
            $type,
            $navaid->kuerzel,
            $navaid->name,
            $navaid->position->longitude,
            $navaid->position->latitude,
            $elevation,
            $navaid->frequency->value,
            $navaid->declination,
            $navaid->isTrueNorth,
            $geoHash,
            $lonlat
        );
    }
}
