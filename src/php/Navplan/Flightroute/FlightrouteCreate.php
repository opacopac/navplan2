<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Shared\DbService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class FlightrouteCreate
{
    public static function createSharedNavplan(array $input)
    {
        $conn = DbService::openDb();
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $input["globalData"]);

        // check if shared navplan already exists
        $navplanHash = hash("md5", serialize($navplan));

        $query = "SELECT share_id FROM navplan WHERE md5_hash = '" . $navplanHash . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error reading navplan by hash: " . $conn->error . " query:" . $query);

        if ($result->num_rows > 0)
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
                die("error inserting navplan: " . $conn->error . " query:" . $query);
            else
                $navplan_id = $conn->insert_id;

            // create waypoints
            self::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan_id);
        }


        echo json_encode(array("share_id" => $share_id), JSON_NUMERIC_CHECK);
    }


    public static function createNavplan(array $input)
    {
        $conn = DbService::openDb();
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $input["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $_GET["token"]);

        // get user id
        $query = "SELECT id FROM users WHERE email = '" . $email . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error reading user id: " . $conn->error . " query:" . $query);

        if ($result->num_rows > 0)
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
            die("error inserting navplan: " . $conn->error . " query:" . $query);
        else
            $navplan_id = $conn->insert_id;


        // update waypoints
        self::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan_id);


        echo json_encode(array("navplan_id" => $navplan_id), JSON_NUMERIC_CHECK);
    }


    public static function createWaypoints(mysqli $conn, array $waypoints, array $alternate, int $navplan_id)
    {
        for ($i = 0; $i < count($waypoints); $i++)
        {
            $query = self::createInsertWaypointQuery($waypoints[$i], $i, $navplan_id, 0);
            $result = $conn->query($query);

            if ($result === FALSE)
                die("error inserting waypoint: " . $conn->error . " query:" . $query);
        }

        if ($alternate)
        {
            $query = self::createInsertWaypointQuery($alternate, count($waypoints), $navplan_id, 1);
            $result = $conn->query($query);

            if ($result === FALSE)
                die("error inserting alternate: " . $conn->error . " query:" . $query);
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