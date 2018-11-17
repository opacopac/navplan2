<?php namespace Navplan\MapFeatures;
include_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Shared\DbService;


class SearchItemWebcam {
    public static function searchByExtent(mysqli $conn, float $minLon, float $minLat, float $maxLon, float $maxLat) {
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


    private static function readWebcamFromResult(array $rs): array {
        return array(
            "id" => $rs["id"],
            "name" => $rs["name"],
            "url" => $rs["url"],
            "latitude" => MapFeaturesHelper::reduceDegAccuracy($rs["latitude"], "WEBCAM"),
            "longitude" => MapFeaturesHelper::reduceDegAccuracy($rs["longitude"], "WEBCAM")
        );
    }
}
