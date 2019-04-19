<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use Navplan\Shared\IDbService;


class SearchItemWebcam {
    public static function searchByExtent(IDbService $dbService, float $minLon, float $minLat, float $maxLon, float $maxLat) {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IS NULL";
        $query .= "   AND (longitude >= " . $minLon . " AND longitude <= " . $maxLon . " AND latitude >= " . $minLat . " AND latitude <= " . $maxLat . ")";

        $result = $dbService->execMultiResultQuery($query, "error reading webcams");

        $webcams = [];
        while ($rs = $result->fetch_assoc()) {
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
