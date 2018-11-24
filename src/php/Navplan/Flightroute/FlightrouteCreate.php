<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class FlightrouteCreate
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function createSharedNavplan(DbConnection $conn, array $args)
    {
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $args["globalData"]);

        // check if shared navplan already exists
        $navplanHash = hash("md5", serialize($navplan));

        $query = "SELECT share_id FROM navplan WHERE md5_hash = '" . $navplanHash . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error reading navplan by hash", $conn->getError(), $query);

        if ($result->getNumRows() > 0)
        {
            $row = $result->fetch_assoc();
            $share_id = $row["share_id"];
        }
        else
        {
            // create random id
            $share_id = StringNumberService::createRandomString(10);

            // create navplan
            $query = "INSERT INTO navplan (share_id, md5_hash, title, aircraft_speed, aircraft_consumption, extra_fuel, comments) VALUES (";
            $query .= "'" . $share_id . "',";
            $query .= "'" . $navplanHash . "',";
            $query .= "'" . $navplan["title"] . "',";
            $query .= "'" . $navplan["aircraft_speed"] . "',";
            $query .= "'" . $navplan["aircraft_consumption"] . "',";
            $query .= "'" . $navplan["extra_fuel"] . "',";
            $query .= "'" . $navplan["comments"] . "')";

            $result = $conn->query($query);

            if ($result === FALSE)
                throw new DbException("error inserting navplan", $conn->getError(), $query);
            else
                $navplan_id = $conn->getInsertId();

            // create waypoints
            self::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan_id);
        }


        echo json_encode(array("share_id" => $share_id), JSON_NUMERIC_CHECK);
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function createNavplan(DbConnection $conn, array $args)
    {
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $args["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $args["token"]);

        // get user id
        $query = "SELECT id FROM users WHERE email = '" . $email . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error reading user id", $conn->getError(), $query);

        if ($result->getNumRows() > 0)
        {
            $row = $result->fetch_assoc();
            $user_id = $row["id"];
        }
        else
            die("no user id found");

        // create navplan
        $query = "INSERT INTO navplan (user_id, title, aircraft_speed, aircraft_consumption, extra_fuel, comments) VALUES (";
        $query .= "'" . $user_id . "',";
        $query .= "'" . $navplan["title"] . "',";
        $query .= "'" . $navplan["aircraft_speed"] . "',";
        $query .= "'" . $navplan["aircraft_consumption"] . "',";
        $query .= "'" . $navplan["extra_fuel"] . "',";
        $query .= "'" . $navplan["comments"] . "')";

        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error inserting navplan", $conn->getError(), $query);
        else
            $navplan_id = $conn->getInsertId();


        // update waypoints
        self::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan_id);


        echo json_encode(array("navplan_id" => $navplan_id), JSON_NUMERIC_CHECK);
    }


    /**
     * @param DbConnection $conn
     * @param array $waypoints
     * @param array $alternate
     * @param int $navplan_id
     * @throws DbException
     */
    public static function createWaypoints(DbConnection $conn, array $waypoints, array $alternate, int $navplan_id)
    {
        for ($i = 0; $i < count($waypoints); $i++)
        {
            $query = self::createInsertWaypointQuery($waypoints[$i], $i, $navplan_id, 0);
            $result = $conn->query($query);

            if ($result === FALSE)
                throw new DbException("error inserting waypoint", $conn->getError(), $query);
        }

        if ($alternate)
        {
            $query = self::createInsertWaypointQuery($alternate, count($waypoints), $navplan_id, 1);
            $result = $conn->query($query);

            if ($result === FALSE)
                throw new DbException("error inserting alternate", $conn->getError(), $query);
        }
    }


    private static function createInsertWaypointQuery(array $waypoint, int $sortorder, int $navplan_id, int $is_alternate): string
    {
        $query = "INSERT INTO navplan_waypoints (navplan_id, sortorder, type, freq, callsign, checkpoint, airport_icao, latitude, longitude, alt, isminalt, ismaxalt, isaltatlegstart, remark, supp_info, is_alternate) VALUES (";
        $query .= "'" . $navplan_id . "',";
        $query .= "'" . $sortorder . "',";
        $query .= "'" . $waypoint["type"] . "',";
        $query .= "'" . $waypoint["freq"] . "',";
        $query .= "'" . $waypoint["callsign"] . "',";
        $query .= "'" . $waypoint["checkpoint"] . "',";
        $query .= $waypoint["airport_icao"] ? "'" . $waypoint["airport_icao"] . "'," : "NULL, ";
        $query .= "'" . $waypoint["latitude"] . "',";
        $query .= "'" . $waypoint["longitude"] . "',";
        $query .= "'" . $waypoint["alt"] . "',";
        $query .= "'" . $waypoint["isminalt"] . "',";
        $query .= "'" . $waypoint["ismaxalt"] . "',";
        $query .= "'" . $waypoint["isaltatlegstart"] . "',";
        $query .= "'" . $waypoint["remark"] . "',";
        $query .= "'" . $waypoint["supp_info"] . "',";
        $query .= "'" . $is_alternate . "')"; // 0 or 1

        return $query;
    }
}
