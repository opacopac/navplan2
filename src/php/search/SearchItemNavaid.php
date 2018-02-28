<?php
include_once __DIR__ . "/../services/DbService.php";


class SearchItemNavaid {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE MBRIntersects(lonlat, " . $extent . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error searching navaids by extent");

        return self::readNavaidFromResultList($result);
    }


    public static function searchByPosition($conn, $lon, $lat, $maxRadius_deg, $maxResults) {
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

        return self::readNavaidFromResult($result->fetch_array(MYSQLI_ASSOC));
    }


    public static function searchByText($conn, $searchText, $maxResults) {
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


    private static function readNavaidFromResultList($result) {
        $navaids = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $navaids[] = self::readNavaidFromResult($rs);
        }

        return $navaids;
    }


    private static function readNavaidFromResult($rs) {
        $unit = "MHz";

        if ($rs["type"] == "NDB")
            $unit = "kHz";

        return array(
            id => $rs["id"],
            type => $rs["type"],
            kuerzel => $rs["kuerzel"],
            name => $rs["name"],
            latitude => reduceDegAccuracy($rs["latitude"], "NAVAID"),
            longitude => reduceDegAccuracy($rs["longitude"], "NAVAID"),
            elevation => $rs["elevation"],
            frequency => $rs["frequency"],
            unit => $unit,
            declination => $rs["declination"],
            truenorth => $rs["truenorth"]
        );
    }
}
