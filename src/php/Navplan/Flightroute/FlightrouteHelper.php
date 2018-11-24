<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;


class FlightrouteHelper
{
    public static function escapeNavplanData(DbConnection $conn, array $globalData): array
    {
        $nav["id"] = $conn->real_escape_string($globalData["navplan"]["id"]);
        $nav["title"] = $conn->real_escape_string($globalData["navplan"]["title"]);
        $nav["aircraft_speed"] = $conn->real_escape_string($globalData["aircraft"]["speed"]);
        $nav["aircraft_consumption"] = $conn->real_escape_string($globalData["aircraft"]["consumption"]);
        $nav["extra_fuel"] = $conn->real_escape_string($globalData["fuel"]["extraTime"]);
        $nav["comments"] = $conn->real_escape_string($globalData["navplan"]["comments"]);

        foreach ($globalData["navplan"]["waypoints"] as $waypoint)
            $nav["waypoints"][] = self::escapeWaypointData($conn, $waypoint);

        if ($globalData["navplan"]["alternate"])
            $nav["alternate"] = self::escapeWaypointData($conn, $globalData["navplan"]["alternate"]);

        return $nav;
    }


    public static function escapeWaypointData(DbConnection $conn, array $waypoint): array
    {
        $wp["type"] = $conn->real_escape_string($waypoint["type"]);
        $wp["freq"] = $conn->real_escape_string($waypoint["freq"]);
        $wp["callsign"] = $conn->real_escape_string($waypoint["callsign"]);
        $wp["checkpoint"] = $conn->real_escape_string($waypoint["checkpoint"]);
        $wp["airport_icao"] = $waypoint["airport_icao"] ? $conn->real_escape_string($waypoint["airport_icao"]) : NULL;
        $wp["latitude"] = $conn->real_escape_string($waypoint["latitude"]);
        $wp["longitude"] = $conn->real_escape_string($waypoint["longitude"]);
        $wp["alt"] = $conn->real_escape_string($waypoint["alt"]);
        $wp["isminalt"] = $waypoint["isminalt"] ? '1' : '0';
        $wp["ismaxalt"] = $waypoint["ismaxalt"] ? '1' : '0';
        $wp["isaltatlegstart"] = $waypoint["isaltatlegstart"] ? '1' : '0';
        $wp["remark"] = $conn->real_escape_string($waypoint["remark"]);
        $wp["supp_info"] = $conn->real_escape_string($waypoint["supp_info"]);

        return $wp;
    }
}
