<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use BadMethodCallException;
use Navplan\NavplanHelper;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbHelper;
use Navplan\Shared\DbResult;
use Navplan\Shared\DbService;
use Navplan\Shared\DbException;

include_once __DIR__ . "/../NavplanHelper.php";


class SearchItemAirport {
    const MIN_PIXEL_DISTANCE_BETWEEN_ITEMS = 200;  // TODO


    /**
     * @param DbConnection $conn
     * @param float $minLon
     * @param float $minLat
     * @param float $maxLon
     * @param float $maxLat
     * @param int $zoom
     * @param string|NULL $email
     * @return array
     * @throws DbException
     */
    public static function searchByExtent(DbConnection $conn, float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom, string $email = NULL): array {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query  = "SELECT *";
        $query .= " FROM openaip_airports2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching airports by extent");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($conn, $airports, $email);

        return $airports;
    }


    /**
     * @param DbConnection $conn
     * @param float $lon
     * @param float $lat
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @param null|string $email
     * @return array
     * @throws DbException
     */
    public static function searchByPosition(DbConnection $conn, float $lon, float $lat, float $maxRadius_deg, int $maxResults, ?string $email = NULL): array {
        $query  = "SELECT *";
        $query .= " FROM openaip_airports2";
        $query .= " WHERE";
        $query .= "   latitude > " . ($lat - $maxRadius_deg);
        $query .= "   AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "   AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "   AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching airports by position");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($conn, $airports, $email);

        return $airports;
    }


    /**
     * @param DbConnection $conn
     * @param string $searchText
     * @param int $maxResults
     * @param null|string $email
     * @return array
     * @throws DbException
     */
    public static function searchByText(DbConnection $conn, string $searchText, int $maxResults, ?string $email = NULL): array {
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

        $result = DbService::execMultiResultQuery($conn, $query, "error searching airports by text");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($conn, $airports, $email);

        return $airports;
    }


    public static function searchByIcao(DbConnection $conn, $icaoList): array {
        throw new BadMethodCallException("not implemented!");
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param null|string $email
     * @throws DbException
     */
    private static function loadAirportSubItems(DbConnection $conn, &$airports, ?string $email) {
        if (count($airports) == 0)
            return;

        $apIds = [];
        $apIcaos = [];
        foreach ($airports as $ap) {
            $apIds[] = $ap["id"];
            $apIcaos[] = $ap["icao"];
        }

        $apIdList = join(",", $apIds);
        $apIcaoList = "'" . join("','", $apIcaos) . "'";

        self::loadAirportRunways($conn, $airports, $apIdList);
        self::loadAirportRadios($conn, $airports, $apIdList);
        self::loadAirportChars($conn, $airports, $apIcaoList, $email);
        self::loadAirportWebcams($conn, $airports, $apIcaoList);
        self::loadAirportFeatures($conn, $airports, $apIcaoList);
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param string $apIdList
     * @throws DbException
     */
    private static function loadAirportRunways(DbConnection $conn, &$airports, string $apIdList) {
        $query  = "SELECT *";
        $query .= " FROM openaip_runways2";
        $query .= " WHERE operations = 'ACTIVE' AND airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY length DESC, surface ASC, id ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading runways");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["id"] == $rs["airport_id"]) {
                    $ap["runways"][] = self::readAirportRunwayFromResult($rs);
                    break;
                }
            }
        }
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param string $apIdList
     * @throws DbException
     */
    private static function loadAirportRadios(DbConnection $conn, &$airports, string $apIdList) {
        $query  = "SELECT *,";
        $query .= "  (CASE WHEN category = 'COMMUNICATION' THEN 1 WHEN category = 'OTHER' THEN 2 WHEN category = 'INFORMATION' THEN 3 ELSE 4 END) AS sortorder1,";
        $query .= "  (CASE WHEN type = 'TOWER' THEN 1 WHEN type = 'CTAF' THEN 2 WHEN type = 'OTHER' THEN 3 ELSE 4 END) AS sortorder2";
        $query .= " FROM openaip_radios2";
        $query .= " WHERE airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= "   frequency ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading radios");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["id"] == $rs["airport_id"]) {
                    $ap["radios"][] = self::readAirportRadioFromResult($rs);
                    break;
                }
            }
        }
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param string $apIcaoList
     * @param null|string $email
     * @throws DbException
     */
    private static function loadAirportChars(DbConnection $conn, &$airports, string $apIcaoList, ?string $email) {
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

        $result = DbService::execMultiResultQuery($conn, $query, "error reading charts");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["charts"][] = self::readAirportChartFromResult($rs);
                    break;
                }
            }
        }
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param string $apIcaoList
     * @throws DbException
     */
    private static function loadAirportWebcams(DbConnection $conn, &$airports, string $apIcaoList) {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   name ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading webcams");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["webcams"][] = self::readAirportWebcamFromResult($rs);
                    break;
                }
            }
        }
    }


    /**
     * @param DbConnection $conn
     * @param $airports
     * @param string $apIcaoList
     * @throws DbException
     */
    private static function loadAirportFeatures(DbConnection $conn, &$airports, string $apIcaoList) {
        $query  = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading map features");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["mapfeatures"][] = self::readAirportFeatureFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function readAirportFromResultList(DbResult $result): array {
        $airports = [];

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $airports[] = self::readAirportFromResult($rs);
        }

        return $airports;
    }


    private static function readAirportFromResult(array $rs): array {
        $ap = array(
            "id" => $rs["id"],
            "type" => $rs["type"],
            "name" => $rs["name"],
            "icao" => $rs["icao"],
            "country" => $rs["country"],
            "latitude" => MapFeaturesHelper::reduceDegAccuracy($rs["latitude"], "AIRPORT"),
            "longitude" => MapFeaturesHelper::reduceDegAccuracy($rs["longitude"], "AIRPORT"),
            "elevation" => $rs["elevation"],
            "runways" => [],
            "radios" => [],
            "webcams" => [],
            "charts" => [],
            "mapfeatures" => []
        );

        $ap["runways"] = [];
        $ap["radios"] = [];
        $ap["charts"] = [];
        $ap["webcams"] = [];
        $ap["mapfeatures"] = [];

        return $ap;
    }



    private static function readAirportRunwayFromResult(array $rs): array {
        return array(
            "name" => $rs["name"],
            "surface" => $rs["surface"],
            "length" => $rs["length"],
            "width" => $rs["width"],
            "direction1" => $rs["direction1"],
            "direction2" => $rs["direction2"],
            "tora1" => $rs["tora1"],
            "tora2" => $rs["tora2"],
            "lda1" => $rs["lda1"],
            "lda2" => $rs["lda2"],
            "papi1" => $rs["papi1"],
            "papi2" => $rs["papi2"]
        );
    }


    private static function readAirportRadioFromResult(array $rs): array {
        return array(
            "category" => $rs["category"],
            "frequency" => $rs["frequency"],
            "type" => $rs["type"],
            "typespec" => $rs["typespec"],
            "description" => $rs["description"]
        );
    }


    private static function readAirportChartFromResult(array $rs): array {
        return array(
            "id" => $rs["id"],
            "source" => $rs["source"],
            "type" => $rs["type"],
            "filename" => $rs["filename"],
            "mercator_n" => $rs["mercator_n"],
            "mercator_s" => $rs["mercator_s"],
            "mercator_e" => $rs["mercator_e"],
            "mercator_w" => $rs["mercator_w"]
        );
    }


    private static function readAirportWebcamFromResult(array $rs): array {
        return array(
            "name" => $rs["name"],
            "url" => $rs["url"]
        );
    }


    private static function readAirportFeatureFromResult(array $rs): array {
        return array(
            "type" => $rs["type"],
            "name" => $rs["name"]
        );
    }
}
