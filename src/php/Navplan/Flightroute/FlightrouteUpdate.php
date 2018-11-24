<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\User\UserHelper;


class FlightrouteUpdate
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function updateNavplan(DbConnection $conn, array $args)
    {
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $args["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $_GET["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan["id"] . "' AND usr.email = '" . $email . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException("error reading navplan/user", $conn->getError(), $query);

        if ($result->getNumRows() <= 0)
            throw new DbException("no navplan with this id of current user found", $conn->getError(), $query);

        // update navplan
        $query = "UPDATE navplan SET";
        $query .= " title = '" . $navplan["title"] . "',";
        $query .= " aircraft_speed = '" . $navplan["aircraft_speed"] . "',";
        $query .= " aircraft_consumption = '" . $navplan["aircraft_consumption"] . "',";
        $query .= " extra_fuel = '" . $navplan["extra_fuel"] . "',";
        $query .= " comments = '" . $navplan["comments"] . "' ";
        $query .= " WHERE id = '" . $navplan["id"] . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException("error updating navplan", $conn->getError(), $query);

        // update waypoints
        $query = "DELETE FROM navplan_waypoints WHERE navplan_id = '" . $navplan["id"] . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException("error deleting waypoints from navplan", $conn->getError(), $query);

        FlightrouteCreate::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan["id"]);

        echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
    }
}
