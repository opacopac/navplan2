<?php declare(strict_types=1);

namespace Navplan\Flightroute\OLD;

use Navplan\Db\Domain\DbException;
use Navplan\Db\IDb\IDbService;
use Navplan\System\IHttpResponseService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\User\UseCase\UserHelper;


class FlightrouteUpdate {
    public static function updateNavplan(IDbService $dbService, IHttpResponseService $httpService, array $args) {
        $dbService->openDb();

        $navplan = FlightrouteHelper::escapeNavplanData($dbService, $args["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($dbService, $_GET["token"]);

        // check if navplan exists
        $query = "SELECT nav.id FROM navplan AS nav";
        $query .= " INNER JOIN users AS usr ON nav.user_id = usr.id";
        $query .= " WHERE nav.id = '" . $navplan["id"] . "' AND usr.email = '" . $email . "'";

        $result = $dbService->execSingleResultQuery($query, true, "error reading navplan/user");

        if ($result->getNumRows() <= 0) {
            throw new DbException("no navplan with this id of current user found", "n/a", $query);
        }

        // update navplan
        $query = "UPDATE navplan SET";
        $query .= " title = '" . $navplan["title"] . "',";
        $query .= " aircraft_speed = '" . $navplan["aircraft_speed"] . "',";
        $query .= " aircraft_consumption = '" . $navplan["aircraft_consumption"] . "',";
        $query .= " extra_fuel = '" . $navplan["extra_fuel"] . "',";
        $query .= " comments = '" . $navplan["comments"] . "' ";
        $query .= " WHERE id = '" . $navplan["id"] . "'";

        $dbService->execCUDQuery($query, "error updating navplan");

        // update waypoints
        $query = "DELETE FROM navplan_waypoints WHERE navplan_id = '" . $navplan["id"] . "'";
        $dbService->execCUDQuery($query, "error deleting waypoints from navplan");

        FlightrouteCreate::createWaypoints($dbService, $navplan["waypoints"], $navplan["alternate"], $navplan["id"]);

        RequestResponseHelper::sendArrayResponse($httpService, array("success" => 1));

        $dbService->closeDb();
    }
}
