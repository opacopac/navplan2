<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\DomainModel\Flightroute;


class RestFlightrouteConverter {
    public static function fromRest(array $args): Flightroute {
        return new Flightroute(
            StringNumberHelper::parseIntOrNull($args, "id"),
            StringNumberHelper::parseStringOrNull($args, "title"),
            StringNumberHelper::parseFloatOrNull($args, "aircraft_speed"),
            StringNumberHelper::parseFloatOrNull($args, "aircraft_consumption"),
            StringNumberHelper::parseFloatOrNull($args, "extra_fuel"),
            StringNumberHelper::parseStringOrNull($args, "comments"),
            StringNumberHelper::parseIntOrNull($args, "shareid"),
            NULL,
            isset($args["waypoints"]) ?
            array_map(
                function ($wpArgs) { return WaypointConverter::fromRest($wpArgs); },
                $args["waypoints"]
            ) : [],
            isset($args["alternate"]) ? WaypointConverter::fromRest($args["alternate"]) : NULL
        );
    }


    public static function toRest(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title,
            "aircraft_speed" => $flightroute->aircraftSpeedKt,
            "aircraft_consumption" => $flightroute->aircraftConsumptionLpH,
            "extra_fuel" => $flightroute->extraFuelL,
            "comments" => $flightroute->comments,
            "waypoints" => array_map(
                function ($wp) { return WaypointConverter::toRest($wp); },
                $flightroute->waypoinList
            ),
            "alternate" => $flightroute->alternate ? WaypointConverter::toRest($flightroute->alternate) : NULL
        );
    }


    public static function toRestShort(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title
        );
    }
}
