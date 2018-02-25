<?php
include_once __DIR__ . "/../services/DbService.php";


class SearchItemUserPoint {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email, $token) {
        $userPoints = [];

        if ($email && $token) {
            $query = "SELECT uwp.*";
            $query .= " FROM user_waypoints AS uwp";
            $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
            $query .= " WHERE";
            $query .= "  usr.email = '" . $email . "' AND usr.token = '" . $token . "'";
            $query .= "  AND (uwp.longitude >= " . $minLon . " AND uwp.longitude <= " . $maxLon . " AND uwp.latitude >= " . $minLat . " AND uwp.latitude <= " . $maxLat . ")";

            $result = DbService::execMultiResultQuery($conn, $query, "error searching user points by extent");

            return self::readUserPointFromResultList($result);
        }

        return $userPoints;
    }


    public static function searchByPosition($conn, $lon, $lat, $maxRadius_deg, $maxResults, $email, $token) {
        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "  usr.email = '" . $email . "' AND usr.token = '" . $token . "'";
        $query .= "  AND latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching user points by position");

        return self::readUserPointFromResultList($result);
    }


    public static function searchByText($conn, $searchText, $maxResults, $email, $token) {
        $query = "SELECT uwp.*";
        $query .= " FROM user_waypoints AS uwp";
        $query .= "   INNER JOIN users AS usr ON uwp.user_id = usr.id";
        $query .= " WHERE";
        $query .= "   usr.email = '" . $email . "' AND usr.token = '" . $token . "'";
        $query .= "   AND name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching user points by text");

        return self::readUserPointFromResultList($result);
    }


    private static function readUserPointFromResultList($result) {
        $userPoint = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $userPoint[] = self::readUserPointFromResult($rs);
        }

        return $userPoint;
    }


    private static function readUserPointFromResult($rs) {
        return array(
            id => $rs["id"],
            type => $rs["type"],
            name => $rs["name"],
            latitude => $rs["latitude"],
            longitude => $rs["longitude"],
            remark => $rs["remark"],
            supp_info => $rs["supp_info"]
        );
    }
}
