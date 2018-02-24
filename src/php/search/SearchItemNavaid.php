<?php
include_once __DIR__ . "/../services/DbService.php";


class SearchItemNavaid {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE MBRIntersects(lonlat, " . $extent . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading navaids");

        return self::readNavaidFromResultList($result);
    }


    public static function searchByReference($conn, $ref) {
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE id = '" . $ref . "'";

        $result = DbService::execSingleResultQuery($conn, $query, false,"error reading navaid");

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

        $result = DbService::execMultiResultQuery($conn, $query, "error searching navaids");

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
