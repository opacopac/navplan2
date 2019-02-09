<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Shared\IDbService;
use Navplan\User\UserHelper;


class FlightrouteListRead {
    public static function readNavplanList(IDbService $dbService, array $args) {
        $dbService->openDb();

        $email = UserHelper::escapeAuthenticatedEmailOrDie($dbService, $args["token"]);

        // get navplan list
        $query = "SELECT nav.id AS nav_id, nav.title AS nav_title FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE usr.email = '" . $email . "'";
        $query .= " ORDER BY nav.title ASC";

        $result = $dbService->execMultiResultQuery($query, "error reading navplan list");

        // create result array
        while ($row = $result->fetch_assoc()) {
            $navplans[] = array(
                "id" => $row["nav_id"],
                "title" => $row["nav_title"]
            );
        }

        echo json_encode(array("navplanList" => $navplans), JSON_NUMERIC_CHECK);

        $dbService->closeDb();
    }
}
