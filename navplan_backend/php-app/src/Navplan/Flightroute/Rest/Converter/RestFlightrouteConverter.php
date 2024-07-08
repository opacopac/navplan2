<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestConsumptionConverter;
use Navplan\Common\Rest\Converter\RestSpeedConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;


class RestFlightrouteConverter {
    public static function fromRest(array $args): Flightroute {
        return new Flightroute(
            StringNumberHelper::parseIntOrNull($args, "id"),
            StringNumberHelper::parseStringOrError($args, "title"),
            RestSpeedConverter::fromRest($args["aircraft_speed"]),
            RestConsumptionConverter::fromRest($args["aircraft_consumption"]),
            StringNumberHelper::parseIntOrZero($args, "extra_fuel"),
            StringNumberHelper::parseStringOrNull($args, "comments"),
            StringNumberHelper::parseIntOrNull($args, "shareid"),
            NULL,
            isset($args["waypoints"]) ?
            array_map(
                function ($wpArgs) { return RestWaypointConverter::fromRest($wpArgs, false); },
                $args["waypoints"]
            ) : [],
            isset($args["alternate"]) ? RestWaypointConverter::fromRest($args["alternate"], true) : NULL
        );
    }


    public static function toRest(Flightroute $flightroute): array {
        return array(
            "id" => $flightroute->id,
            "title" => $flightroute->title,
            "aircraft_speed" => RestSpeedConverter::toRest($flightroute->aircraftSpeed),
            "aircraft_consumption" => RestConsumptionConverter::toRest($flightroute->aircraftConsumption),
            "extra_fuel" => $flightroute->extraFuelMin,
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
