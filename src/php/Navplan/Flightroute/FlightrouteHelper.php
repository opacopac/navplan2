<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;


class FlightrouteHelper
{
    public static function escapeNavplanData(mysqli $conn, array $globalData): array
    {
        $nav["id"] = mysqli_real_escape_string($conn, $globalData["navplan"]["id"]);
        $nav["title"] = mysqli_real_escape_string($conn, $globalData["navplan"]["title"]);
        $nav["aircraft_speed"] = mysqli_real_escape_string($conn, $globalData["aircraft"]["speed"]);
        $nav["aircraft_consumption"] = mysqli_real_escape_string($conn, $globalData["aircraft"]["consumption"]);
        $nav["extra_fuel"] = mysqli_real_escape_string($conn, $globalData["fuel"]["extraTime"]);
        $nav["comments"] = mysqli_real_escape_string($conn, $globalData["navplan"]["comments"]);

        foreach ($globalData["navplan"]["waypoints"] as $waypoint)
            $nav["waypoints"][] = self::escapeWaypointData($conn, $waypoint);

        if ($globalData["navplan"]["alternate"])
            $nav["alternate"] = self::escapeWaypointData($conn, $globalData["navplan"]["alternate"]);

        return $nav;
    }


    public static function escapeWaypointData(mysqli $conn, array $waypoint): array
    {
        $wp["type"] = mysqli_real_escape_string($conn, $waypoint["type"]);
        $wp["freq"] = mysqli_real_escape_string($conn, $waypoint["freq"]);
        $wp["callsign"] = mysqli_real_escape_string($conn, $waypoint["callsign"]);
        $wp["checkpoint"] = mysqli_real_escape_string($conn, $waypoint["checkpoint"]);
        $wp["airport_icao"] = $waypoint["airport_icao"] ? mysqli_real_escape_string($conn, $waypoint["airport_icao"]) : NULL;
        $wp["latitude"] = mysqli_real_escape_string($conn, $waypoint["latitude"]);
        $wp["longitude"] = mysqli_real_escape_string($conn, $waypoint["longitude"]);
        $wp["alt"] = mysqli_real_escape_string($conn, $waypoint["alt"]);
        $wp["isminalt"] = $waypoint["isminalt"] ? '1' : '0';
        $wp["ismaxalt"] = $waypoint["ismaxalt"] ? '1' : '0';
        $wp["isaltatlegstart"] = $waypoint["isaltatlegstart"] ? '1' : '0';
        $wp["remark"] = mysqli_real_escape_string($conn, $waypoint["remark"]);
        $wp["supp_info"] = mysqli_real_escape_string($conn, $waypoint["supp_info"]);

        return $wp;
    }
}
