<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\AirportType;
use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\GeoHelper;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportConverter {
    public static function fromDbRow(array $row): Airport {
        return new Airport(
            intval($row[DbTableAirport::COL_ID]),
            AirportType::from($row[DbTableAirport::COL_TYPE]),
            $row[DbTableAirport::COL_NAME],
            $row[DbTableAirport::COL_ICAO] !== "" ? $row[DbTableAirport::COL_ICAO] : NULL,
            $row[DbTableAirport::COL_COUNTRY],
            DbPosition2dConverter::fromDbRow($row, DbTableAirport::COL_LONGITUDE, DbTableAirport::COL_LATITUDE),
            new Altitude(floatval($row[DbTableAirport::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    /**
     * @param IDbResult $result
     * @return Airport[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $airports = [];

        while ($row = $result->fetch_assoc()) {
            $airports[] = DbAirportConverter::fromDbRow($row);
        }

        return $airports;
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
