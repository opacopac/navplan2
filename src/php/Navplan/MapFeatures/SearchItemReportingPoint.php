<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use BadMethodCallException;
use Navplan\Shared\DbHelper;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class SearchItemReportingPoint {
    public static function searchByExtent(IDbService $dbService, float $minLon, float $minLat, float $maxLon, float $maxLat) {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extent . ")";

        $result = $dbService->execMultiResultQuery($query, "error reading reporting points by extent");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByPosition(IDbService $dbService, float $lon, float $lat, float $maxRadius_deg, int $maxResults) {
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

        $result = $dbService->execMultiResultQuery($query,"error searching reporting points by position");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByText(IDbService $dbService, string $searchText, int $maxResults) {
        $query = "SELECT * FROM reporting_points";
        $query .= " WHERE";
        $query .= "   airport_icao LIKE '" . $searchText . "%'";
        $query .= " ORDER BY airport_icao ASC, name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $dbService->execMultiResultQuery($query, "error searching reporting points by text");

        return self::readReportingPointFromResultList($result);
    }


    public static function searchByIcao(IDbService $dbService, $icaoList): array {
        throw new BadMethodCallException("not implemented!");
    }


    private static function readReportingPointFromResultList(IDbResult $result): array {
        $reportingPoint = [];
        while ($rs = $result->fetch_assoc()) {
            $reportingPoint[] = self::readReportingPointFromResult($rs);
        }

        return $reportingPoint;
    }


    private static function readReportingPointFromResult(array $rs): array {
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
            "latitude" => $rs["latitude"] ? MapFeaturesHelper::reduceDegAccuracy($rs["latitude"], "REPORTINGPOINT") : NULL, // only for reporting points
            "longitude" => $rs["longitude"] ? MapFeaturesHelper::reduceDegAccuracy($rs["longitude"], "REPORTINGPOINT") : NULL, // only for reporting points
            "polygon" => $polygon // only for reporting sectors
        );
    }
}
