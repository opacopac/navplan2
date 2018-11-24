<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\User\UserHelper;


class FlightrouteDelete
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function deleteNavplan(DbConnection $conn, array $args)
    {
        $navplan_id = checkId(intval($args["id"]));
        $email = UserHelper::escapeAuthenticatedEmailOrDie($conn, $args["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan_id . "' AND usr.email = '" . $email . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException("error searching navplan/user", $conn->getError(), $query);
        if ($result->getNumRows() <= 0)
            throw new DbException("no navplan with this id of current user found", $conn->getError(), $query);

        // update navplan
        $query = "DELETE FROM navplan WHERE id = '" . $navplan_id . "'";
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException("error deleting navplan", $conn->getError(), $query);

        echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
    }
}
