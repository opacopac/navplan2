<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class FlightrouteListRead
{
    public static function readNavplanList()
    {
        $conn = DbService::openDb();
        $email = StringNumberService::checkEscapeEmail($conn, UserHelper::getAuthenticatedEmailOrDie($_GET["token"]));

        // get navplan list
        $query = "SELECT nav.id AS nav_id, nav.title AS nav_title FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE usr.email = '" . $email . "'";
        $query .= " ORDER BY nav.title ASC";

        $result = $conn->query($query);

        if ($result === FALSE)
            die("error reading navplan list: " . $conn->error . " query:" . $query);

        // create result array
        while ($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $navplans[] = array(
                "id" => $row["nav_id"],
                "title" => $row["nav_title"]
            );
        }

        echo json_encode(array("navplanList" => $navplans), JSON_NUMERIC_CHECK);
    }
}
