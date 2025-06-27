<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Repo;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Service\IAirportRepo;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportFeatureConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRadioConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbShortAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Domain\Model\IDbResult;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\MySqlDb\DbHelper;
use Throwable;


class DbAirportRepo implements IAirportRepo
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    public function readById(int $id): Airport
    {
        $query = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE id = " . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by id");
        $airport = DbAirportConverter::fromDbRow($result->fetch_assoc());
        self::loadAirportSubItems($airport);

        return $airport;
    }


    public function readByIcao(string $icao): Airport
    {
        $query = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE icao = " . $this->dbService->escapeAndQuoteString($icao);

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by icao");
        $airport = DbAirportConverter::fromDbRow($result->fetch_assoc());
        self::loadAirportSubItems($airport);

        return $airport;
    }


    public function searchShortByExtent(Extent2d $extent, int $zoom): array
    {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT ";
        $query .= "  ad." . DbTableAirport::COL_ID . ",";
        $query .= "  ad." . DbTableAirport::COL_TYPE . ",";
        $query .= "  ad." . DbTableAirport::COL_ICAO . ",";
        $query .= "  ad." . DbTableAirport::COL_LATITUDE . ",";
        $query .= "  ad." . DbTableAirport::COL_LONGITUDE . ",";
        $query .= "  rwy." . DbTableAirportRunway::COL_DIRECTION . ",";
        $query .= "  rwy." . DbTableAirportRunway::COL_SURFACE . ",";
        $query .= "  GROUP_CONCAT(fea.type) as features";
        $query .= " FROM " . DbTableAirport::TABLE_NAME . " ad";
        $query .= " LEFT JOIN " . DbTableAirportRunway::TABLE_NAME . " rwy ON rwy." . DbTableAirportRunway::COL_AIRPORT_ID . " = ad." . DbTableAirport::COL_ID;
        $query .= " LEFT JOIN map_features fea ON fea.airport_icao = ad." . DbTableAirport::COL_ICAO;
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(ad." . DbTableAirport::COL_LONLAT . ", " . $extentPoly . ")";
        $query .= "    AND";
        $query .= "  ad." . DbTableAirport::COL_ZOOMMIN . " <= " . $zoom;
        $query .= "    AND";
        $query .= "  (";
        $query .= "    rwy." . DbTableAirportRunway::COL_ID . " IS NULL";
        $query .= "      OR";
        $query .= "    (";
        $query .= "      rwy." . DbTableAirportRunway::COL_OPERATIONS . " = '" . AirportRunwayOperations::ACTIVE->value . "'";
        $query .= "        AND";
        $query .= "      rwy.length = (SELECT MAX(" . DbTableAirportRunway::COL_LENGTH . ") FROM " . DbTableAirportRunway::TABLE_NAME . " WHERE " . DbTableAirportRunway::COL_AIRPORT_ID . " = ad." . DbTableAirport::COL_ID . ")";
        $query .= "    )";
        $query .= "  )";
        $query .= "  GROUP BY ad." . DbTableAirport::COL_ID;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by extent");

        $airports = [];
        while ($row = $result->fetch_assoc()) {
            $airports[] = DbShortAirportConverter::fromDbRow($row);
        }

        return $airports;
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        $query = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableAirport::COL_LATITUDE . " > " . ($position->latitude - $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LATITUDE . " < " . ($position->latitude + $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LONGITUDE . " > " . ($position->longitude - $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LONGITUDE . " < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((" . DbTableAirport::COL_LATITUDE . " - " . $position->latitude . ") * (" . DbTableAirport::COL_LATITUDE . " - " . $position->latitude .
            ") + (" . DbTableAirport::COL_LONGITUDE . " - " . $position->longitude . ") * (" . DbTableAirport::COL_LONGITUDE . " - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by position");
        $airports = self::readAirportFromResultList($result);

        return $airports;
    }


    public function searchByText(string $searchText, int $maxResults): array
    {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableAirport::COL_ICAO . " LIKE '" . $searchText . "%'";
        $query .= "   OR " . DbTableAirport::COL_NAME . " LIKE '" . $searchText . "%'";
        $query .= " ORDER BY";
        $query .= "   CASE WHEN " . DbTableAirport::COL_COUNTRY . " = 'CH' THEN 1 ELSE 2 END ASC,";
        $query .= "   CASE WHEN ISNULL(" . DbTableAirport::COL_ICAO . ") OR " . DbTableAirport::COL_ICAO . " = '' THEN 2 ELSE 1 END ASC,";
        $query .= "   CASE WHEN " . DbTableAirport::COL_TYPE . " = 'INTL_APT' THEN 1";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'APT' OR " . DbTableAirport::COL_TYPE . " = 'AF_CIVIL' OR type = 'AF_MIL_CIVIL' OR type = 'AF_WATER' OR type = 'AD_MIL' THEN 2";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'GLIDING' OR " . DbTableAirport::COL_TYPE . " = 'LIGHT_AIRCRAFT' THEN 3";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'HELI_CIVIL' OR " . DbTableAirport::COL_TYPE . " = 'HELI_MIL' THEN 4";
        $query .= "        ELSE 5 END ASC,";
        $query .= "   " . DbTableAirport::COL_ICAO . " ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");
        $airports = self::readAirportFromResultList($result);

        return $airports;
    }


    public function insertAll(array $airports): void
    {
        $airport_statement = DbAirportConverter::prepareInsertStatement($this->dbService);

        foreach ($airports as $airport) {
            try {
                DbAirportConverter::bindInsertStatement($airport, $airport_statement);
                $airport_statement->execute();
                $airport_id = $airport_statement->getInsertId();

                // radios
                if ($airport->hasRadios()) {
                    $radio_statement = DbAirportRadioConverter::prepareInsertStatement($this->dbService);

                    foreach ($airport->radios as $radio) {
                        DbAirportRadioConverter::bindInsertStatement($radio, $airport_id, $radio_statement);
                        $radio_statement->execute();
                    }
                }

                // runways
                if ($airport->hasRunways()) {
                    $rwy_statement = DbAirportRunwayConverter::prepareInsertStatement($this->dbService);

                    foreach ($airport->runways as $rwy) {
                        DbAirportRunwayConverter::bindInsertStatement($rwy, $airport_id, $rwy_statement);
                        $rwy_statement->execute();
                    }
                }
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting airport '" . $airport->name . "'");
                throw $ex;
            }
        }
    }


    public function deleteAll(): bool
    {
        $query = "TRUNCATE TABLE " . DbTableAirportRunway::TABLE_NAME;
        $result1 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirportRadio::TABLE_NAME;
        $result2 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirport::TABLE_NAME;
        $result3 = $this->dbService->execCUDQuery($query);

        return $result1 && $result2 && $result3;
    }


    private function loadAirportSubItems(Airport &$airport): void
    {
        $airport->runways = $this->loadAirportRunways($airport->id);
        $airport->radios = $this->loadAirportRadios($airport->id);
        $airport->charts2 = $this->loadAirportCharts2($airport->icao);
        $airport->mapfeatures = $this->loadAirportFeatures($airport->icao);
        // TODO: load ad webcams
    }


    /**
     * @param int $airportId
     * @return AirportRunway[]
     */
    private function loadAirportRunways(int $airportId): array
    {
        $query = "SELECT *";
        $query .= " FROM openaip_runways2";
        $query .= " WHERE operations = 'ACTIVE' AND airport_id = " . $airportId;
        $query .= " ORDER BY length DESC, surface ASC, id ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading runways for airport id " . $airportId);

        return DbAirportRunwayConverter::fromDbResult($result);
    }


    /**
     * @param int $airportId
     * @return AirportRadio[]
     */
    private function loadAirportRadios(int $airportId): array
    {
        $query = "SELECT *,";
        $query .= "  (CASE WHEN category = 'COMMUNICATION' THEN 1 WHEN category = 'OTHER' THEN 2 WHEN category = 'INFORMATION' THEN 3 ELSE 4 END) AS sortorder1,";
        $query .= "  (CASE WHEN type = 'TOWER' THEN 1 WHEN type = 'CTAF' THEN 2 WHEN type = 'OTHER' THEN 3 ELSE 4 END) AS sortorder2";
        $query .= " FROM openaip_radios2";
        $query .= " WHERE airport_id = " . $airportId;
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= "   frequency ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading radios for airport id " . $airportId);

        return DbAirportRadioConverter::fromDbResult($result);
    }


    /**
     * @param string $adIcao
     * @return AirportChart[]
     */
    private function loadAirportCharts2(string $adIcao): array
    {
        if (!$adIcao) {
            return [];
        }

        // TODO => use chart repo
        $query = "SELECT *,";
        $query .= "  (CASE WHEN name LIKE 'AREA%' THEN 1 WHEN name LIKE 'VAC%' THEN 2 WHEN name LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts2 ";
        $query .= " WHERE ad_icao = " . $this->dbService->escapeAndQuoteString($adIcao);
        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   name ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading charts for airport icao " . $adIcao);

        return DbAirportChart2Converter::fromDbResult($result);
    }


    /**
     * @param string $adIcao
     * @return AirportFeature[]
     */
    private function loadAirportFeatures(string $adIcao): array
    {
        if (!$adIcao) {
            return [];
        }

        $query = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao = " . $this->dbService->escapeAndQuoteString($adIcao);
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading map features for airport icao " . $adIcao);

        return DbAirportFeatureConverter::fromDbResult($result);
    }


    private function readAirportFromResultList(IDbResult $result): array
    {
        $airports = [];

        while ($row = $result->fetch_assoc()) {
            $airports[] = DbAirportConverter::fromDbRow($row);
        }

        return $airports;
    }
}
