<?php declare(strict_types=1);

namespace Navplan\Flightroute\OLD;

use Navplan\Db\IDb\IDbService;


class FlightrouteHelper
{
    public static function escapeNavplanData(IDbService $dbService, array $globalData): array
    {
        $nav["id"] = $dbService->escapeString($globalData["navplan"]["id"]);
        $nav["title"] = $dbService->escapeString($globalData["navplan"]["title"]);
        $nav["aircraft_speed"] = $dbService->escapeString($globalData["aircraft"]["speed"]);
        $nav["aircraft_consumption"] = $dbService->escapeString($globalData["aircraft"]["consumption"]);
        $nav["extra_fuel"] = $dbService->escapeString($globalData["fuel"]["extraTime"]);
        $nav["comments"] = $dbService->escapeString($globalData["navplan"]["comments"]);

        foreach ($globalData["navplan"]["waypoints"] as $waypoint)
            $nav["waypoints"][] = self::escapeWaypointData($dbService, $waypoint);

        if ($globalData["navplan"]["alternate"])
            $nav["alternate"] = self::escapeWaypointData($dbService, $globalData["navplan"]["alternate"]);

        return $nav;
    }


    public static function escapeWaypointData(IDbService $dbService, array $waypoint): array
    {
        $wp["type"] = $dbService->escapeString($waypoint["type"]);
        $wp["freq"] = $dbService->escapeString($waypoint["freq"]);
        $wp["callsign"] = $dbService->escapeString($waypoint["callsign"]);
        $wp["checkpoint"] = $dbService->escapeString($waypoint["checkpoint"]);
        $wp["airport_icao"] = $waypoint["airport_icao"] ? $dbService->escapeString($waypoint["airport_icao"]) : NULL;
        $wp["latitude"] = $dbService->escapeString($waypoint["latitude"]);
        $wp["longitude"] = $dbService->escapeString($waypoint["longitude"]);
        $wp["alt"] = $dbService->escapeString($waypoint["alt"]);
        $wp["isminalt"] = $waypoint["isminalt"] ? '1' : '0';
        $wp["ismaxalt"] = $waypoint["ismaxalt"] ? '1' : '0';
        $wp["isaltatlegstart"] = $waypoint["isaltatlegstart"] ? '1' : '0';
        $wp["remark"] = $dbService->escapeString($waypoint["remark"]);
        $wp["supp_info"] = $dbService->escapeString($waypoint["supp_info"]);

        return $wp;
    }
}
