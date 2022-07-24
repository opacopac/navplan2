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
    public static function fromDbRow(array $row): Navaid {
        return new Navaid(
            intval($row[DbTableNavaid::COL_ID]),
            NavaidType::from($row[DbTableNavaid::COL_TYPE]),
            $row[DbTableNavaid::COL_KUERZEL],
            $row[DbTableNavaid::COL_NAME],
            DbPosition2dConverter::fromDbRow($row),
            new Altitude(floatval($row[DbTableNavaid::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL),
            new Frequency(floatval($row[DbTableNavaid::COL_FREQUENCY]), $row[DbTableNavaid::COL_TYPE] === "NDB" ? FrequencyUnit::KHZ : FrequencyUnit::MHZ),
            floatval($row[DbTableNavaid::COL_DECLINATION]),
            boolval($row[DbTableNavaid::COL_TRUENORTH])
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . DbTableNavaid::TABLE_NAME . " (" . join(", ", [
            DbTableNavaid::COL_TYPE,
            DbTableNavaid::COL_KUERZEL,
            DbTableNavaid::COL_NAME,
            DbTableNavaid::COL_LONGITUDE,
            DbTableNavaid::COL_LATITUDE,
            DbTableNavaid::COL_ELEVATION,
            DbTableNavaid::COL_FREQUENCY,
            DbTableNavaid::COL_DECLINATION,
            DbTableNavaid::COL_TRUENORTH,
            DbTableNavaid::COL_GEOHASH,
            DbTableNavaid::COL_LONLAT
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
