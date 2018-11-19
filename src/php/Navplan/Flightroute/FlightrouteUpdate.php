<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;
use Navplan\User\UserHelper;


class FlightrouteUpdate
{
    public static function updateNavplan(array $input)
    {
        $conn = DbService::openDb();
        $navplan = FlightrouteHelper::escapeNavplanData($conn, $input["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $_GET["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan["id"] . "' AND usr.email = '" . $email . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            die("error reading navplan/user: " . $conn->error . " query:" . $query);

        if ($result->num_rows <= 0)
            die("no navplan with id: '" . $navplan["id"] . "' of current user found");

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
            die("error updating navplan: " . $conn->error . " query:" . $query);

        // update waypoints
        $query = "DELETE FROM navplan_waypoints WHERE navplan_id = '" . $navplan["id"] . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            die("error deleting waypoints from navplan: " . $conn->error . " query:" . $query);

        FlightrouteCreate::createWaypoints($conn, $navplan["waypoints"], $navplan["alternate"], $navplan["id"]);

        echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
    }
}
