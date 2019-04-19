<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class SearchItemUserPoint {
    public static function searchByExtent(IDbService $dbService, float $minLon, float $minLat, float $maxLon, float $maxLat, ?string $email = null) {
        if (!$email)
            return [];

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "'";
        $query .= "  AND (uwp.longitude >= " . $minLon . " AND uwp.longitude <= " . $maxLon . " AND uwp.latitude >= " . $minLat . " AND uwp.latitude <= " . $maxLat . ")";

        $result = $dbService->execMultiResultQuery($query, "error searching user points by extent");

        return self::readUserPointFromResultList($result);
    }


    public static function searchByPosition(IDbService $dbService, float $lon, float $lat, float $maxRadius_deg, int $maxResults, ?string $email = null) {
        if (!$email)
            return [];

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "'";
        $query .= "  AND latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $dbService->execMultiResultQuery($query, "error searching user points by position");

        return self::readUserPointFromResultList($result);
    }


    public static function searchByText(IDbService $dbService, string $searchText, int $maxResults, ?string $email = null) {
        if (!$email)
            return [];

        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "   usr.email = '" . $email . "''";
        $query .= "   AND name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $dbService->execMultiResultQuery($query, "error searching user points by text");

        return self::readUserPointFromResultList($result);
    }


    private static function readUserPointFromResultList(IDbResult $result): array {
        $userPoint = [];
        while ($rs = $result->fetch_assoc()) {
            $userPoint[] = self::readUserPointFromResult($rs);
        }

        return $userPoint;
    }


    private static function readUserPointFromResult(array $rs): array {
        return array(
            "id" => $rs["id"],
            "type" => $rs["type"],
            "name" => $rs["name"],
            "latitude" => $rs["latitude"],
            "longitude" => $rs["longitude"],
            "remark" => $rs["remark"],
            "supp_info" => $rs["supp_info"]
        );
    }
}
