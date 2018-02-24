<?php
include_once __DIR__ . "/../services/DbService.php";


const MAX_BOTTOM_ALT_FL = 200;


class SearchItemAirspace {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);

        $query  = "SELECT *";
        $query .= " FROM openaip_airspace AS air";
        $query .= " WHERE";
        $query .= "  MBRIntersects(extent, " . $extent . ")";
        $query .= "    AND";
        $query .= "  (alt_bottom_height < " . MAX_BOTTOM_ALT_FL . " OR alt_bottom_unit <> 'FL')";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading airspaces");

        $airspaces = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $airspaces[$rs["aip_id"]] = self::readAirspaceFromResult($rs);
        }

        return $airspaces;
    }


    public static function searchById($conn, $id) {
        // TODO: Implement SearchByReference() method.
    }


    private static function readAirspaceFromResult($rs) {
        // prepare coordinates
        $polygon = convertDbPolygonToArray($rs["polygon"]);

        return array(
            id => (int)$rs["id"],
            aip_id => (int)$rs["aip_id"],
            category => $rs["category"],
            country => $rs["country"],
            name => $rs["name"],
            alt => array(
                top => array(
                    ref => $rs["alt_top_reference"],
                    height => $rs["alt_top_height"],
                    unit => $rs["alt_top_unit"]
                ),
                bottom => array(
                    ref => $rs["alt_bottom_reference"],
                    height => $rs["alt_bottom_height"],
                    unit => $rs["alt_bottom_unit"]
                )
            ),
            polygon => $polygon
        );

    }
}
