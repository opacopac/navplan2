<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbHelper;
use Navplan\Shared\DbResult;
use Navplan\Shared\DbService;
use Navplan\Shared\DbException;

include_once __DIR__ . "/../NavplanHelper.php";


class SearchItemNavaid {
    const MIN_PIXEL_DISTANCE_BETWEEN_ITEMS = 200;  // TODO


    /**
     * @param DbConnection $conn
     * @param float $minLon
     * @param float $minLat
     * @param float $maxLon
     * @param float $maxLat
     * @param int $zoom
     * @return array
     * @throws DbException
     */
    public static function searchByExtent(DbConnection $conn, float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom) {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;


        $result = DbService::execMultiResultQuery($conn, $query, "error searching navaids by extent");

        return self::readNavaidFromResultList($result);
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
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "  latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query,"error searching navaids by position");

        return self::readNavaidFromResultList($result);
    }


    /**
     * @param DbConnection $conn
     * @param string $searchText
     * @param int $maxResults
     * @return array
     * @throws DbException
     */
    public static function searchByText(DbConnection $conn, string $searchText, int $maxResults) {
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "   kuerzel LIKE '" . $searchText . "%'";
        $query .= "   OR name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY CASE WHEN country = 'CH' THEN 1 ELSE 2 END ASC, kuerzel ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching navaids by text");

        return self::readNavaidFromResultList($result);
    }


    private static function readNavaidFromResultList(DbResult $result): array {
        $navaids = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $navaids[] = self::readNavaidFromResult($rs);
        }

        return $navaids;
    }


    private static function readNavaidFromResult(array $rs): array {
        $unit = "MHz";

        if ($rs["type"] == "NDB")
            $unit = "kHz";

        return array(
            "id" => $rs["id"],
            "type" => $rs["type"],
            "kuerzel" => $rs["kuerzel"],
            "name" => $rs["name"],
            "latitude" => MapFeaturesHelper::reduceDegAccuracy($rs["latitude"], "NAVAID"),
            "longitude" => MapFeaturesHelper::reduceDegAccuracy($rs["longitude"], "NAVAID"),
            "elevation" => $rs["elevation"],
            "frequency" => $rs["frequency"],
            "unit" => $unit,
            "declination" => $rs["declination"],
            "truenorth" => $rs["truenorth"]
        );
    }
}
