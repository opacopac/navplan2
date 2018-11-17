<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


class FlightrouteDelete
{
    public static function deleteNavplan()
    {
        $conn = DbService::openDb();
        $navplan_id = checkId(intval($_GET["id"]));
        $email = StringNumberService::checkEscapeEmail($conn, UserHelper::getAuthenticatedEmailOrDie($_GET["token"]));

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
