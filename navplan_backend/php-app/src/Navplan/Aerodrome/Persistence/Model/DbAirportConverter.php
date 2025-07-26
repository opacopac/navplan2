<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\AirportType;
use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\GeoHelper;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\Domain\Service\IDbService;


/**
 * @extends DbEntityConverter<Airport>
 */
class DbAirportConverter extends DBEntityConverter
{
    public function __construct(private readonly DbTableAirport $table)
    {
    }


    public function fromDbRow(array $row): Airport
    {
        $r = new DbRowAirport($this->table, $row);

        return new Airport(
            $r->getId(),
            AirportType::from($r->getType()),
            $r->getName(),
            $r->getIcao(),
            $r->getCountry(),
            $r->getPosition(),
            Altitude::fromMtAmsl($r->getElevationMtAmsl())
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement
    {
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


    public static function bindInsertStatement(Airport $airport, IDbStatement $insertStatement)
    {
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
