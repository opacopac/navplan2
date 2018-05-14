<?php
include_once __DIR__ . "/../services/DbService.php";


class SearchItemWebcam {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat) {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IS NULL";
        $query .= "   AND (longitude >= " . $minLon . " AND longitude <= " . $maxLon . " AND latitude >= " . $minLat . " AND latitude <= " . $maxLat . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading webcams");

        $webcams = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $webcams[] = self::readWebcamFromResult($rs);
        }

        return $webcams;
    }


    public static function searchByIcao($conn, $icaoList, $minNotamTimestamp, $maxNotamTimestamp) {
        die("not implemented!");
    }


    private static function readWebcamFromResult($rs) {
        return array(
            id => $rs["id"],
            name => $rs["name"],
            url => $rs["url"],
            latitude => reduceDegAccuracy($rs["latitude"], "WEBCAM"),
            longitude => reduceDegAccuracy($rs["longitude"], "WEBCAM")
        );
    }
}
