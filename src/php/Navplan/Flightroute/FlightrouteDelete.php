<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\User\UserHelper;


class FlightrouteDelete {
    public static function deleteNavplan(IDbService $dbService, array $args) {
        $dbService->openDb();

        $navplan_id = checkId(intval($args["id"]));
        $email = UserHelper::escapeAuthenticatedEmailOrDie($dbService, $args["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan_id . "' AND usr.email = '" . $email . "'";

        $result = $dbService->execSingleResultQuery($query, true, "error searching navplan/user");

        if ($result->getNumRows() <= 0) {
            throw new DbException("no navplan with this id of current user found", "n/a", $query);
        }

        // update navplan
        $query = "DELETE FROM navplan WHERE id = '" . $navplan_id . "'";
        $dbService->execCUDQuery($query, "error deleting navplan");

        RequestResponseHelper::sendArrayResponse(array("success" => 1));

        $dbService->closeDb();
    }
}
