<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use BadMethodCallException;
use Navplan\Db\MySqlDb\DbHelper;
use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\UseCase\IAirportRepo;
use Navplan\Db\UseCase\IDbResult;
use Navplan\Db\UseCase\IDbService;


class DbAirportRepo implements IAirportRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query  = "SELECT *";
        $query .= " FROM openaip_airports2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extentPoly . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching airports by extent");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($airports);

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

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching airports by position");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($airports);

        return $airports;
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->getDbService()->escapeString($searchText);
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

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching airports by text");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($airports);

        return $airports;
    }


    public function searchByIcao($icaoList): array {
        throw new BadMethodCallException("not implemented!");
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
        // $this->loadAirportChars($airports, $apIcaoList, $email);
        $this->loadAirportWebcams($airports, $apIcaoList);
        $this->loadAirportFeatures($airports, $apIcaoList);
    }


    private function loadAirportRunways(array &$airports, string $apIdList) {
        $this->getDbService()->escapeString($apIdList);
        $query  = "SELECT *";
        $query .= " FROM openaip_runways2";
        $query .= " WHERE operations = 'ACTIVE' AND airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY length DESC, surface ASC, id ASC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading runways");

        while ($rs = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->id === $rs["airport_id"]) {
                    $ap->runways[] = DbAirportRunway::fromDbResult($rs);
                    break;
                }
            }
        }
    }


    private function loadAirportRadios(array &$airports, string $apIdList) {
        $this->getDbService()->escapeString($apIdList);
        $query  = "SELECT *,";
        $query .= "  (CASE WHEN category = 'COMMUNICATION' THEN 1 WHEN category = 'OTHER' THEN 2 WHEN category = 'INFORMATION' THEN 3 ELSE 4 END) AS sortorder1,";
        $query .= "  (CASE WHEN type = 'TOWER' THEN 1 WHEN type = 'CTAF' THEN 2 WHEN type = 'OTHER' THEN 3 ELSE 4 END) AS sortorder2";
        $query .= " FROM openaip_radios2";
        $query .= " WHERE airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= "   frequency ASC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading radios");

        while ($rs = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->id === $rs["airport_id"]) {
                    $ap->radios[] = DbAirportRadio::fromDbResult($rs);
                    break;
                }
            }
        }
    }


    /*private function loadAirportChars(array &$airports, string $apIcaoList, ?string $email) {
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts ";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";

        // hack: show VFRM charts only in branch
        if (!$email && !NavplanHelper::isBranch())
            $query .= " AND source != 'VFRM' ";

        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading charts");

        while ($rs = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] === $rs["airport_icao"]) {
                    $ap["charts"][] = self::readAirportChartFromResult($rs);
                    break;
                }
            }
        }
    }*/


    private function loadAirportWebcams(array &$airports, string $apIcaoList) {
        $this->getDbService()->escapeString($apIcaoList);
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   name ASC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading webcams");

        while ($rs = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->icao === $rs["airport_icao"]) {
                    $ap->webcams[] = DbWebcam::fromDbResult($rs);
                    break;
                }
            }
        }
    }


    private function loadAirportFeatures(array &$airports, string $apIcaoList) {
        $this->getDbService()->escapeString($apIcaoList);
        $query  = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading map features");

        while ($rs = $result->fetch_assoc()) {
            foreach ($airports as &$ap) {
                if ($ap->icao === $rs["airport_icao"]) {
                    $ap->mapfeatures[] = DbMapFeature::fromDbResult($rs);
                    break;
                }
            }
        }
    }


    private function readAirportFromResultList(IDbResult $result): array {
        $airports = [];

        while ($rs = $result->fetch_assoc()) {
            $airports[] = DbAirport::fromDbResult($rs);
        }

        return $airports;
    }
}
