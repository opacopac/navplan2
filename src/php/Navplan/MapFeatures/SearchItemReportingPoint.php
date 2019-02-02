<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use BadMethodCallException;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbHelper;
use Navplan\Shared\DbResult;
use Navplan\Shared\DbService;
use Navplan\Shared\DbException;

include_once __DIR__ . "/../NavplanHelper.php";


class SearchItemReportingPoint {
    /**
     * @param DbConnection $conn
     * @param float $minLon
     * @param float $minLat
     * @param float $maxLon
     * @param float $maxLat
     * @return array
     * @throws DbException
     */
    public static function searchByExtent(DbConnection $conn, float $minLon, float $minLat, float $maxLon, float $maxLat) {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extent . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading reporting points by extent");

        return self::readReportingPointFromResultList($result);
    }


    /**
     * @param DbConnection $conn
     * @param float $lon
     * @param float $lat
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return array
     * @throws DbException
     */
    public static function searchByPosition(DbConnection $conn, float $lon, float $lat, float $maxRadius_deg, int $maxResults) {
        $query = "SELECT *";
        $query .= " FROM reporting_points";
        $query .= " WHERE";
        $query .= "  latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query,"error searching reporting points by position");

        return self::readReportingPointFromResultList($result);
    }


    /**
     * @param DbConnection $conn
     * @param string $searchText
     * @param int $maxResults
     * @return array
     * @throws DbException
     */
    public static function searchByText(DbConnection $conn, string $searchText, int $maxResults) {
        $query = "SELECT * FROM reporting_points";
        $query .= " WHERE";
        $query .= "   airport_icao LIKE '" . $searchText . "%'";
        $query .= " ORDER BY airport_icao ASC, name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching reporting points by text");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByIcao(DbConnection $conn, $icaoList): array {
        throw new BadMethodCallException("not implemented!");
    }


    private static function readReportingPointFromResultList(DbResult $result): array {
        $reportingPoint = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $reportingPoint[] = self::readReportingPointFromResult($rs);
        }

        return $reportingPoint;
    }


    private static function readReportingPointFromResult(array $rs): array {
        if ($rs["polygon"]) {
            // prepare coordinates
            $polygon = [];
            $coord_pairs = explode(",", $rs["polygon"]);

            foreach ($coord_pairs as $latlon)
                $polygon[] = explode(" ", trim($latlon));
        } else
            $polygon = NULL;

        return array(
            "id" => $rs["id"],
            "type" => $rs["type"],
            "airport_icao" => $rs["airport_icao"],
            "name" => $rs["name"],
            "heli" => $rs["heli"],
            "inbd_comp" => $rs["inbd_comp"],
            "outbd_comp" => $rs["outbd_comp"],
            "min_ft" => $rs["min_ft"],
            "max_ft" => $rs["max_ft"],
            "latitude" => $rs["latitude"] ? MapFeaturesHelper::reduceDegAccuracy($rs["latitude"], "REPORTINGPOINT") : NULL, // only for reporting points
            "longitude" => $rs["longitude"] ? MapFeaturesHelper::reduceDegAccuracy($rs["longitude"], "REPORTINGPOINT") : NULL, // only for reporting points
            "polygon" => $polygon // only for reporting sectors
        );
    }
}
