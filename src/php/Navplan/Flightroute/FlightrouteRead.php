<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class FlightrouteRead
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function readSharedNavplan(DbConnection $conn, array $args)
    {
        $share_id = StringNumberService::checkEscapeString($conn, $args["shareid"], 10, 10);

        // get navplan details
        $query = "SELECT id, title, aircraft_speed, aircraft_consumption, extra_fuel, comments FROM navplan";
        $query .= " WHERE share_id = '" . $share_id . "'";

        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error reading shared navplan", $conn->getError(), $query);

        if ($result->getNumRows() > 0)
        {
            $row = $result->fetch_assoc();
            $navplan["id"] = $row["id"];
            $navplan["title"] = $row["title"];
            $navplan["aircraft_speed"] = $row["aircraft_speed"];
            $navplan["aircraft_consumption"] = $row["aircraft_consumption"];
            $navplan["extra_fuel"] = $row["extra_fuel"];
            $navplan["comments"] = $row["comments"];
        }
        else
            throw new DbException("no navplan with this share-id found", $conn->getError(), $query);

        // add waypoints
        $wpalt = self::readNavplanWaypoints($conn, $navplan["id"]);

        $navplan["waypoints"] = $wpalt["waypoints"];
        $navplan["alternate"] = $wpalt["alternate"];
        $navplan["id"] = NULL;


        echo json_encode(array("navplan" => $navplan), JSON_NUMERIC_CHECK);
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function readNavplan(DbConnection $conn, array $args)
    {
        $navplan_id = StringNumberService::checkId(intval($args["id"]));
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $args["token"]);

        // get navplan details
        $query = "SELECT nav.id AS id, nav.title AS title, nav.aircraft_speed AS aircraft_speed, nav.aircraft_consumption AS aircraft_consumption, nav.extra_fuel AS extra_fuel, nav.comments AS comments FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan_id . "' AND usr.email = '" . $email . "'";

        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error reading navplan", $conn->getError(), $query);

        if ($result->getNumRows() > 0)
        {
            $row = $result->fetch_assoc();
            $navplan["id"] = $row["id"];
            $navplan["title"] = $row["title"];
            $navplan["aircraft_speed"] = $row["aircraft_speed"];
            $navplan["aircraft_consumption"] = $row["aircraft_consumption"];
            $navplan["extra_fuel"] = $row["extra_fuel"];
            $navplan["comments"] = $row["comments"];
        }
        else
            throw new DbException("no navplan with this id of current user found", $conn->getError(), $query);

        // add waypoints
        $wpalt = self::readNavplanWaypoints($conn, $navplan_id);

        $navplan["waypoints"] = $wpalt["waypoints"];
        $navplan["alternate"] = $wpalt["alternate"];

        echo json_encode(array("navplan" => $navplan), JSON_NUMERIC_CHECK);
    }


    /**
     * @param DbConnection $conn
     * @param int $navplanId
     * @return array
     * @throws DbException
     */
    private static function readNavplanWaypoints(DbConnection $conn, int $navplanId): array
    {
        // get navplan waypoints
        $query = "SELECT wp.type, wp.freq, wp.callsign, wp.checkpoint, wp.alt, wp.isminalt, wp.ismaxalt, wp.isaltatlegstart, wp.remark, wp.supp_info, wp.latitude, wp.longitude, wp.airport_icao, wp.is_alternate FROM navplan_waypoints AS wp";
        $query .= " WHERE wp.navplan_id = '" . $navplanId . "'";
        $query .= " ORDER BY wp.sortorder ASC";

        $result = $conn->query($query);

        if ($result === FALSE)
            throw new DbException("error reading navplan waypoints", $conn->getError(), $query);

        // create result array
        $waypoints = [];
        $alternate = NULL;
        while ($row = $result->fetch_assoc())
        {
            $wp = array(
                "type" => $row["type"],
                "freq" => $row["freq"],
                "callsign" => $row["callsign"],
                "checkpoint" => $row["checkpoint"],
                "airport_icao" => $row["airport_icao"],
                "latitude" => $row["latitude"],
                "longitude" => $row["longitude"],
                "alt" => $row["alt"],
                "isminalt" => $row["isminalt"],
                "ismaxalt" => $row["ismaxalt"],
                "isaltatlegstart" => $row["isaltatlegstart"],
                "remark" => $row["remark"],
                "supp_info" => $row["supp_info"]
            );

            if ($row["is_alternate"] == 1)
                $alternate = $wp;
            else
                $waypoints[] = $wp;
        }

        return array("waypoints" => $waypoints, "alternate" => $alternate);
    }
}
