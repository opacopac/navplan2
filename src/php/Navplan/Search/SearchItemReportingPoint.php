<?php namespace Navplan\Search;
include_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


class SearchItemReportingPoint {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extent . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading reporting points by extent");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByPosition($conn, $lon, $lat, $maxRadius_deg, $maxResults) {
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


    public static function searchByText($conn, $searchText, $maxResults) {
        $query = "SELECT * FROM reporting_points";
        $query .= " WHERE";
        $query .= "   airport_icao LIKE '" . $searchText . "%'";
        $query .= " ORDER BY airport_icao ASC, name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching reporting points by text");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByIcao($conn, $icaoList, $minNotamTimestamp, $maxNotamTimestamp): array {
        die("not implemented!");
    }


    private static function readReportingPointFromResultList($result) {
        $reportingPoint = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $reportingPoint[] = self::readReportingPointFromResult($rs);
        }

        return $reportingPoint;
    }


    private static function readReportingPointFromResult($rs) {
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
            "latitude" => reduceDegAccuracy($rs["latitude"], "REPORTINGPOINT"),
            "longitude" => reduceDegAccuracy($rs["longitude"], "REPORTINGPOINT"),
            "polygon" => $polygon
        );
    }
}
