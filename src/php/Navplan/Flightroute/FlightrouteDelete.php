<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\User\UserHelper;


class FlightrouteDelete
{
    public static function deleteNavplan(mysqli $conn, array $args)
    {
        $navplan_id = checkId(intval($args["id"]));
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $args["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan_id . "' AND usr.email = '" . $email . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            die("error searching navplan/user: " . $conn->error . " query:" . $query);
        if ($result->num_rows <= 0)
            die("no navplan with id: '" . $navplan_id . "' of current user found");

        // update navplan
        $query = "DELETE FROM navplan WHERE id = '" . $navplan_id . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            die("error deleting navplan: " . $conn->error . " query:" . $query);

        echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
    }
}
