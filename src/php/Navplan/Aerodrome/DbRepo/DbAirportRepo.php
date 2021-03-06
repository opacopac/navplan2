<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbRepo;

use Navplan\Aerodrome\DbModel\DbAirportChartConverter;
use Navplan\Aerodrome\DbModel\DbAirportConverter;
use Navplan\Aerodrome\DbModel\DbAirportFeatureConverter;
use Navplan\Aerodrome\DbModel\DbAirportRadioConverter;
use Navplan\Aerodrome\DbModel\DbAirportRunwayConverter;
use Navplan\Aerodrome\DbModel\DbShortAirportConverter;
use Navplan\Aerodrome\DomainModel\Airport;
use Navplan\Aerodrome\DomainService\IAirportChartRepo;
use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirportRepo implements IAirportRepo {
    public function __construct(
        private IDbService $dbService,
        private IAirportChartRepo $airportChartRepo
    ) {
    }


    public function readById(int $id): Airport {
        $query  = "SELECT * FROM openaip_airports2 WHERE id = " . $id;

        $result = $this->dbService->execSingleResultQuery($query, false,"error loading airport by id");
        $row = $result->fetch_assoc();
        $airport = DbAirportConverter::fromDbRow($row);
        $airports = [$airport];
        self::loadAirportSubItems($airports);

        return $airport;
    }


    public function readByIcao(string $icao): Airport {
        $query  = "SELECT * FROM openaip_airports2 WHERE icao = " . $this->dbService->escapeAndQuoteString($icao);

        $result = $this->dbService->execSingleResultQuery($query, false,"error loading airport by icao");
        $row = $result->fetch_assoc();
        $airport = DbAirportConverter::fromDbRow($row);
        $airports = [$airport];
        self::loadAirportSubItems($airports);

        return $airport;
    }


    public function searchShortByExtent(Extent2d $extent, int $zoom): array {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query  = "SELECT ad.id, ad.type, ad.icao, ad.latitude, ad.longitude, rwy.direction1, rwy.surface, GROUP_CONCAT(fea.type) as features";
        $query .= " FROM openaip_airports2 ad";
        $query .= " LEFT JOIN openaip_runways2 rwy ON rwy.airport_id = ad.id";
        $query .= " LEFT JOIN map_features fea ON fea.airport_icao = ad.icao";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(ad.lonlat, " . $extentPoly . ")";
        $query .= "    AND";
        $query .= "  ad.zoommin <= " . $zoom;
        $query .= "    AND";
        $query .= "  (";
        $query .= "    rwy.id IS NULL";
        $query .= "      OR";
        $query .= "    (";
        $query .= "      rwy.operations = 'ACTIVE'";
        $query .= "        AND";
        $query .= "      rwy.length = (SELECT MAX(length) FROM openaip_runways2 WHERE airport_id = ad.id)";
        $query .= "    )";
        $query .= "  )";
        $query .= "  GROUP BY ad.id";

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by extent");

        $airports = [];
        while ($row = $result->fetch_assoc()) {
            $airports[] = DbShortAirportConverter::fromDbRow($row);
        }

        return $airports;
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query  = "SELECT *";
        $query .= " FROM openaip_airports2";
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
        $query .= " FROM openaip_airports2";
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
        $this->loadAirportChars($airports, $apIcaoList);
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


    private function loadAirportChars(array &$airports, string $apIcaoList) {
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
