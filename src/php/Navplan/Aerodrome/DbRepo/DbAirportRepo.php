<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbRepo;

use Navplan\Aerodrome\DbModel\DbAirportChart2Converter;
use Navplan\Aerodrome\DbModel\DbAirportChartConverter;
use Navplan\Aerodrome\DbModel\DbAirportConverter;
use Navplan\Aerodrome\DbModel\DbAirportFeatureConverter;
use Navplan\Aerodrome\DbModel\DbAirportRadioConverter;
use Navplan\Aerodrome\DbModel\DbAirportRunwayConverter;
use Navplan\Aerodrome\DbModel\DbShortAirportConverter;
use Navplan\Aerodrome\DbModel\DbTableAirport;
use Navplan\Aerodrome\DbModel\DbTableAirportRadio;
use Navplan\Aerodrome\DbModel\DbTableAirportRunway;
use Navplan\Aerodrome\DomainModel\Airport;
use Navplan\Aerodrome\DomainModel\AirportRunwayOperations;
use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\MySqlDb\DbHelper;
use Throwable;


class DbAirportRepo implements IAirportRepo {
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function readById(int $id): Airport {
        $query  = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE id = " . $id;

        $result = $this->dbService->execSingleResultQuery($query, false,"error loading airport by id");
        $row = $result->fetch_assoc();
        $airport = DbAirportConverter::fromDbRow($row);
        $airports = [$airport];
        self::loadAirportSubItems($airports);

        return $airport;
    }


    public function readByIcao(string $icao): Airport {
        $query  = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE icao = " . $this->dbService->escapeAndQuoteString($icao);

        $result = $this->dbService->execSingleResultQuery($query, false,"error loading airport by icao");
        $row = $result->fetch_assoc();
        $airport = DbAirportConverter::fromDbRow($row);
        $airports = [$airport];
        self::loadAirportSubItems($airports);

        return $airport;
    }


    public function searchShortByExtent(Extent2d $extent, int $zoom): array {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        //$query  = "SELECT ad.id, ad.type, ad.icao, ad.latitude, ad.longitude, rwy.direction, rwy.surface, GROUP_CONCAT(fea.type) as features";
        $query  = "SELECT ";
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
        /*$query .= "  ad.zoommin <= " . $zoom;
        $query .= "    AND";*/
        $query .= "  (";
        $query .= "    rwy." . DbTableAirportRunway::COL_ID . " IS NULL";
        $query .= "      OR";
        $query .= "    (";
        $query .= "      rwy." . DbTableAirportRunway::COL_OPERATIONS . " = '" . AirportRunwayOperations::ACTIVE->value . "'";
        $query .= "        AND";
        $query .= "      rwy.length = (SELECT MAX(" . DbTableAirportRunway::COL_LENGTH . ") FROM " . DbTableAirportRunway::TABLE_NAME . " WHERE airport_id = ad." . DbTableAirport::COL_ID . ")";
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


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query  = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "   AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "   AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "   AND longitude < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude .
            ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by position");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($airports);

        return $airports;
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   icao LIKE '" . $searchText . "%'";
        $query .= "   OR name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY";
        $query .= "   CASE WHEN country = 'CH' THEN 1 ELSE 2 END ASC,";
        $query .= "   CASE WHEN ISNULL(icao) OR icao = '' THEN 2 ELSE 1 END ASC,";
        $query .= "   CASE WHEN type = 'INTL_APT' THEN 1";
        $query .= "        WHEN type = 'APT' OR type = 'AF_CIVIL' OR type = 'AF_MIL_CIVIL' OR type = 'AF_WATER' OR type = 'AD_MIL' THEN 2";
        $query .= "        WHEN type = 'GLIDING' OR type = 'LIGHT_AIRCRAFT' THEN 3";
        $query .= "        WHEN type = 'HELI_CIVIL' OR type = 'HELI_MIL' THEN 4";
        $query .= "        ELSE 5 END ASC,";
        $query .= "   icao ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($airports);

        return $airports;
    }



    public function insertAll(array $airports): void {
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


    public function deleteAll(): bool {
        $query = "TRUNCATE TABLE " . DbTableAirportRunway::TABLE_NAME;
        $result1 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirportRadio::TABLE_NAME;
        $result2 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirport::TABLE_NAME;
        $result3 = $this->dbService->execCUDQuery($query);

        return $result1 && $result2 && $result3;
    }



    private function loadAirportSubItems(array &$airports) {
        if (count($airports) == 0)
            return;

        $apIds = [];
        $apIcaos = [];
        foreach ($airports as $ap) {
            $apIds[] = $ap->id;
            $apIcaos[] = $ap->icao;
        }

        $apIdList = join(",", $apIds);
        $apIcaoList = "'" . join("','", $apIcaos) . "'";

        $this->loadAirportRunways($airports, $apIdList);
        $this->loadAirportRadios($airports, $apIdList);
        $this->loadAirportCharts($airports, $apIcaoList);
        $this->loadAirportCharts2($airports, $apIcaoList);
        $this->loadAirportFeatures($airports, $apIcaoList);
    }


    private function loadAirportRunways(array &$airports, string $apIdList) {
        $this->dbService->escapeString($apIdList);
        $query  = "SELECT *";
        $query .= " FROM openaip_runways2";
        $query .= " WHERE operations = 'ACTIVE' AND airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY length DESC, surface ASC, id ASC";
        $result = $this->dbService->execMultiResultQuery($query, "error reading runways");

        while ($row = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->id === intval($row["airport_id"])) {
                    $ap->runways[] = DbAirportRunwayConverter::fromDbRow($row);
                    break;
                }
            }
        }
    }


    private function loadAirportRadios(array &$airports, string $apIdList) {
        $this->dbService->escapeString($apIdList);
        $query  = "SELECT *,";
        $query .= "  (CASE WHEN category = 'COMMUNICATION' THEN 1 WHEN category = 'OTHER' THEN 2 WHEN category = 'INFORMATION' THEN 3 ELSE 4 END) AS sortorder1,";
        $query .= "  (CASE WHEN type = 'TOWER' THEN 1 WHEN type = 'CTAF' THEN 2 WHEN type = 'OTHER' THEN 3 ELSE 4 END) AS sortorder2";
        $query .= " FROM openaip_radios2";
        $query .= " WHERE airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= "   frequency ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading radios");

        while ($row = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->id === intval($row["airport_id"])) {
                    $ap->radios[] = DbAirportRadioConverter::fromDbRow($row);
                    break;
                }
            }
        }
    }


    private function loadAirportCharts(array &$airports, string $apIcaoList) {
        // TODO => use chart repo
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts ";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading charts");

        while ($row = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->icao === $row["airport_icao"]) {
                    $ap->charts[] = DbAirportChartConverter::fromDbRow($row);
                    break;
                }
            }
        }
    }


    private function loadAirportCharts2(array &$airports, string $apIcaoList) {
        // TODO => use chart repo
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts2 ";
        $query .= " WHERE ad_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading charts");

        while ($row = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->icao === $row["ad_icao"]) {
                    $ap->charts2[] = DbAirportChart2Converter::fromDbRow($row);
                    break;
                }
            }
        }
    }


    private function loadAirportFeatures(array &$airports, string $apIcaoList) {
        $this->dbService->escapeString($apIcaoList);
        $query  = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading map features");

        while ($row = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->icao === $row["airport_icao"]) {
                    $ap->mapfeatures[] = DbAirportFeatureConverter::fromDbRow($row);
                    break;
                }
            }
        }
    }


    private function readAirportFromResultList(IDbResult $result): array {
        $airports = [];

        while ($row = $result->fetch_assoc()) {
            $airports[] = DbAirportConverter::fromDbRow($row);
        }

        return $airports;
    }
}
