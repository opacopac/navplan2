<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\RestModel\RestConsumptionConverter;
use Navplan\Common\RestModel\RestSpeedConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\DomainModel\Flightroute;


class RestFlightrouteConverter {
    public static function fromRest(array $args): Flightroute {
        return new Flightroute(
            StringNumberHelper::parseIntOrNull($args, "id"),
            StringNumberHelper::parseStringOrNull($args, "title"),
            RestSpeedConverter::fromRest($args["aircraft_speed"]),
            RestConsumptionConverter::fromRest($args["aircraft_consumption"]),
            StringNumberHelper::parseFloatOrNull($args, "extra_fuel"),
            StringNumberHelper::parseStringOrNull($args, "comments"),
            StringNumberHelper::parseIntOrNull($args, "shareid"),
            NULL,
            isset($args["waypoints"]) ?
            array_map(
                function ($wpArgs) { return RestWaypointConverter::fromRest($wpArgs); },
                $args["waypoints"]
            ) : [],
            isset($args["alternate"]) ? RestWaypointConverter::fromRest($args["alternate"]) : NULL
        );
    }


    public static function toRest(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title,
            "aircraft_speed" => RestSpeedConverter::toRest($flightroute->aircraftSpeedKt),
            "aircraft_consumption" => RestConsumptionConverter::toRest($flightroute->aircraftConsumption),
            "extra_fuel" => $flightroute->extraFuelL,
            "comments" => $flightroute->comments,
            "waypoints" => array_map(
                function ($wp) { return RestWaypointConverter::toRest($wp); },
                $flightroute->waypoinList
            ),
            "alternate" => $flightroute->alternate ? RestWaypointConverter::toRest($flightroute->alternate) : NULL
        );
    }


    public static function toRestShort(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title
        );
    }
}
