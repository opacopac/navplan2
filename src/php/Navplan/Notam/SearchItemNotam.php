<?php namespace Navplan\Search;
include_once __DIR__ . "/../NavplanHelper.php";

use mysqli, mysqli_result;
use Navplan\Shared\DbService;


class SearchItemNotam {
    const NOTAM_MAX_BOTTOM_FL = 195;
    const MIN_PIXEL_NOTAMAREA_DIAMETER = 30;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public static function searchByExtent(mysqli $conn, float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        die("not implemented");

        /*$extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $pixelResolutionDeg = GeoService::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_NOTAMAREA_DIAMETER;
        // get firs & ads within extent
        $icaoList = self::loadIcaoListByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);

        // load notams by icao
        $query = "SELECT ntm.notam AS notam, geo.geometry AS geometry, ST_AsText(geo.extent) AS extent"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry AS geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE icao IN ('" .  join("','", $icaoList) . "')"
            . "    AND startdate <= '" . DbService::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND enddate >= '" . DbService::getDbTimeString($minNotamTimestamp) . "'"
            . "  ST_INTERSECTS(air.extent, " . $extent . ")"
            . "    AND"
            . "  air.diameter > " . $minDiameterDeg
            . "    AND"
            . "  (" . $zoom . " >= det.zoommin AND " . $zoom . "<= det.zoommax)";


        $result = DbService::execMultiResultQuery($conn, $query, "error reading notams");
        $areaNotamList = self::readNotamFromResultList($result);
        $areaNotamList = self::removeNonAreaNotams($areaNotamList);

        return $areaNotamList;*/
    }


    public static function searchByPosition(mysqli $conn, float $lat, float $lon, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults) {
        $query = "SELECT ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry geo ON geo.icao_notam_id = ntm.id "
            . "    INNER JOIN icao_fir fir ON fir.statecode = ntm.country"
            . "    LEFT JOIN icao_fir fir2 ON fir2.icao = ntm.icao"
            . "   WHERE ST_INTERSECTS(geo.extent,". DbService::getDbPointStringFromLonLat([$lon, $lat]) . ")"
            . "    AND ntm.startdate <= '" . DbService::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbService::getDbTimeString($minNotamTimestamp) . "'"
            . "    AND (ST_INTERSECTS(fir.polygon,". DbService::getDbPointStringFromLonLat([$lon, $lat]) . "))" //" OR (fir2.icao IS NULL AND geo.geometry IS NOT NULL))"
            . "   ORDER BY ntm.startdate DESC"
            . "   LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching notams");

        return self::readNotamFromResultList($result);
    }


    public static function searchByIcao(mysqli $conn, array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp) {
        $query = "SELECT ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry2 geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE"
            . "    ntm.icao IN ('" . join("','", $icaoList) . "')"
            . "    AND ntm.startdate <= '" . DbService::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbService::getDbTimeString($minNotamTimestamp) . "'"
            . "   ORDER BY ntm.startdate DESC";

        $result = DbService::execMultiResultQuery($conn, $query, "error searching notams");

        return self::readNotamFromResultList($result);
    }


    public static function searchByReference(mysqli $conn, $ref) {
        die("not implemented");
    }


    public static function searchByText(mysqli $conn, string $searchText, int $maxResults) {
        die("not implemented");
    }


    /*private static function loadIcaoListByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $extentSql = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT DISTINCT icao FROM icao_fir WHERE ST_INTERSECTS(polygon, " . $extentSql . ") AND icao <> ''";
        $query .= " UNION ";
        $query .= "SELECT DISTINCT icao FROM openaip_airports WHERE ST_INTERSECTS(lonlat, " . $extentSql . ") AND icao <> ''";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading fir/ad icao list");

        $icaoList = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC))
            $icaoList[] = $rs["icao"];

        return $icaoList;
    }


    private static function removeNonAreaNotams($notamList) {
        $areaNotamList = [];

        foreach ($notamList as $notam) {
            if (self::isAreaNotam($notam))
                $areaNotamList[] = $notam;
        }

        return $areaNotamList;
    }


    private static function isAreaNotam($notam) {
        if ($notam["isICAO"]) {
            $qtype = strtoupper(substr($notam["Qcode"], 0, 1));

            if ($qtype == "W" || $qtype == "R") // || $qtype == "X")
                return true;
        } else {
            if ($notam["type"] == "airspace")
                return true;
        }

        return false;
    }*/


    private static function readNotamFromResultList(mysqli_result $result): array {
        $notams = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $notam = self::readNotamFromResult($rs);

            // filter by max FL195
            if ($notam["geometry"] && $notam["geometry"]["bottom"] >= NOTAM_MAX_BOTTOM_FL)
                continue;

            // filter by notam type (no KKKK)
            if ($notam["Qcode"] == "KKKK")
                continue;

            $notams[] = $notam;
        }

        return $notams;
    }


    private static function readNotamFromResult(array $rs): array {
        $notam = json_decode($rs["notam"], JSON_NUMERIC_CHECK);
        $notam["notam_id"] = $notam["id"];
        $notam["id"] = $rs["id"];
        $notam["geometry"] = json_decode($rs["geometry"], JSON_NUMERIC_CHECK);

        return $notam;
    }
}
