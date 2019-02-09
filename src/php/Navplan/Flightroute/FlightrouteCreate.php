<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class FlightrouteCreate {
    public static function createSharedNavplan(IDbService $dbService, array $args) {
        $dbService->openDb();

        $navplan = FlightrouteHelper::escapeNavplanData($dbService, $args["globalData"]);

        // check if shared navplan already exists
        $navplanHash = hash("md5", serialize($navplan));

        $query = "SELECT share_id FROM navplan WHERE md5_hash = '" . $navplanHash . "'";
        $result = $dbService->execSingleResultQuery($query, true, "error reading navplan by hash");

        if ($result->getNumRows() > 0) {
            $row = $result->fetch_assoc();
            $share_id = $row["share_id"];
        } else {
            // create random id
            $share_id = StringNumberService::createRandomString(10);

            // create navplan
            $query = "INSERT INTO navplan (share_id, md5_hash, title, aircraft_speed, aircraft_consumption, extra_fuel, comments) VALUES (";
            $query .= "'" . $share_id . "',";
            $query .= "'" . $navplanHash . "',";
            $query .= "'" . $navplan["title"] . "',";
            $query .= "'" . $navplan["aircraft_speed"] . "',";
            $query .= "'" . $navplan["aircraft_consumption"] . "',";
            $query .= "'" . $navplan["extra_fuel"] . "',";
            $query .= "'" . $navplan["comments"] . "')";

            $result = $dbService->execCUDQuery($query, "error inserting navplan");

            $navplan_id = $dbService->getInsertId();

            // create waypoints
            self::createWaypoints($dbService, $navplan["waypoints"], $navplan["alternate"], $navplan_id);
        }

        RequestResponseHelper::sendArrayResponse(array("share_id" => $share_id));

        $dbService->closeDb();
    }


    public static function createNavplan(IDbService $dbService, array $args) {
        $dbService->openDb();

        $navplan = FlightrouteHelper::escapeNavplanData2($dbService, $args["globalData"]);
        $email = UserHelper::escapeAuthenticatedEmailOrDie($dbService, $args["token"]);

        // get user id
        $query = "SELECT id FROM users WHERE email = '" . $email . "'";
        $result = $dbService->execSingleResultQuery($query, true, "error reading user id");

        if ($result->getNumRows() > 0) {
            $row = $result->fetch_assoc();
            $user_id = $row["id"];
        } else {
            throw new DbException("no user id found", "n/a");
        }

        // create navplan
        $query = "INSERT INTO navplan (user_id, title, aircraft_speed, aircraft_consumption, extra_fuel, comments) VALUES (";
        $query .= "'" . $user_id . "',";
        $query .= "'" . $navplan["title"] . "',";
        $query .= "'" . $navplan["aircraft_speed"] . "',";
        $query .= "'" . $navplan["aircraft_consumption"] . "',";
        $query .= "'" . $navplan["extra_fuel"] . "',";
        $query .= "'" . $navplan["comments"] . "')";

        $result = $dbService->execCUDQuery($query, "error inserting navplan");
        $navplan_id = $dbService->getInsertId();

        // update waypoints
        self::createWaypoints($dbService, $navplan["waypoints"], $navplan["alternate"], $navplan_id);

        RequestResponseHelper::sendArrayResponse(array("navplan_id" => $navplan_id));

        $dbService->closeDb();
    }


    public static function createWaypoints(IDbService $dbService, array $waypoints, array $alternate, int $navplan_id) {
        for ($i = 0; $i < count($waypoints); $i++) {
            $query = self::createInsertWaypointQuery($waypoints[$i], $i, $navplan_id, 0);
            $dbService->execCUDQuery($query, "error inserting waypoint");
        }

        if ($alternate) {
            $query = self::createInsertWaypointQuery($alternate, count($waypoints), $navplan_id, 1);
            $dbService->execCUDQuery($query, "error inserting alternate");
        }
    }


    private static function createInsertWaypointQuery(array $waypoint, int $sortorder, int $navplan_id, int $is_alternate): string {
        $query = "INSERT INTO navplan_waypoints (navplan_id, sortorder, type, freq, callsign, checkpoint, airport_icao, latitude, longitude, alt, isminalt, ismaxalt, isaltatlegstart, remark, supp_info, is_alternate) VALUES (";
        $query .= "'" . $navplan_id . "',";
        $query .= "'" . $sortorder . "',";
        $query .= "'" . $waypoint["type"] . "',";
        $query .= "'" . $waypoint["freq"] . "',";
        $query .= "'" . $waypoint["callsign"] . "',";
        $query .= "'" . $waypoint["checkpoint"] . "',";
        $query .= $waypoint["airport_icao"] ? "'" . $waypoint["airport_icao"] . "'," : "NULL, ";
        $query .= "'" . $waypoint["latitude"] . "',";
        $query .= "'" . $waypoint["longitude"] . "',";
        $query .= "'" . $waypoint["alt"] . "',";
        $query .= "'" . $waypoint["isminalt"] . "',";
        $query .= "'" . $waypoint["ismaxalt"] . "',";
        $query .= "'" . $waypoint["isaltatlegstart"] . "',";
        $query .= "'" . $waypoint["remark"] . "',";
        $query .= "'" . $waypoint["supp_info"] . "',";
        $query .= "'" . $is_alternate . "')"; // 0 or 1

        return $query;
    }
}
