<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Shared\StringNumberService;


class RestFlightroute {
    public static function fromArgs(array $args): Flightroute {
        return new Flightroute(
            StringNumberService::parseIntOrNull($args, "id"),
            StringNumberService::parseStringOrNull($args, "title"),
            StringNumberService::parseFloatOrNull($args, "aircraft_speed"),
            StringNumberService::parseFloatOrNull($args, "aircraft_consumption"),
            StringNumberService::parseFloatOrNull($args, "extra_fuel"),
            StringNumberService::parseStringOrNull($args, "comments"),
            StringNumberService::parseIntOrNull($args, "shareid"),
            NULL,
            isset($args["waypoints"]) ?
            array_map(
                function ($wpArgs) { return RestWaypoint::fromArgs($wpArgs); },
                $args["waypoints"]
            ) : [],
            isset($args["alternate"]) ? RestWaypoint::fromArgs($args["alternate"]) : NULL
        );
    }


    public static function toArray(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title,
            "aircraft_speed" => $flightroute->aircraftSpeedKt,
            "aircraft_consumption" => $flightroute->aircraftConsumptionLpH,
            "extra_fuel" => $flightroute->extraFuelL,
            "comments" => $flightroute->comments,
            "waypoints" => array_map(
                function ($wp) { return RestWaypoint::toArray($wp); },
                $flightroute->waypoinList
            ),
            "alternate" => $flightroute->alternate ? RestWaypoint::toArray($flightroute->alternate) : NULL
        );
    }


    public static function toListResultArray(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title
        );
    }
}
