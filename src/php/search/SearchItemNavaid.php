<?php
include_once __DIR__ . "/../services/DbService.php";
include_once __DIR__ . "/../quadtree/QuadTree.php";


class SearchItemNavaid {
    const FILENAME_NAVAID_INDEX = __DIR__ . "/../quadtree/index/navaid.qix";
    const MIN_PIXEL_DISTANCE_BETWEEN_ITEMS = 200;  // TODO


    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom) {
        // read ids from quad tree index
        /*$resolutionDeg = $pixelResolutionDeg * self::MIN_PIXEL_DISTANCE_BETWEEN_ITEMS;
        $file = fopen(self::FILENAME_NAVAID_INDEX, "r");
        $itemIds = QuadTree::readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg);
        fclose($file);

        if (!$itemIds || count($itemIds) == 0) {
            return [];
        }*/

        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;
        //$query .= " WHERE id IN (" . join(",", $itemIds) . ")";


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

        return self::readNavaidFromResultList($result);
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
