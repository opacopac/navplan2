<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\Domain\Waypoint;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Shared\StringNumberHelper;


class WaypointConverter {
    public static function fromArgs(array $args): Waypoint {
        return new Waypoint(
            StringNumberHelper::parseStringOrError($args, "type"),
            StringNumberHelper::parseStringOrError($args, "freq"),
            StringNumberHelper::parseStringOrError($args, "callsign"),
            StringNumberHelper::parseStringOrError($args, "checkpoint"),
            StringNumberHelper::parseStringOrError($args, "alt"),
            StringNumberHelper::parseBoolOrError($args, "isminalt"),
            StringNumberHelper::parseBoolOrError($args, "ismaxalt"),
            StringNumberHelper::parseBoolOrError($args, "isaltatlegstart"),
            StringNumberHelper::parseStringOrError($args, "remark"),
            StringNumberHelper::parseStringOrNull($args, "supp_info"),
            new Position2d(
                StringNumberHelper::parseFloatOrError($args, "longitude"),
                StringNumberHelper::parseFloatOrError($args, "latitude")
            ),
            StringNumberHelper::parseStringOrNull($args, "airport_icao"),
            FALSE
        );
    }


    public static function toArray(Waypoint $wp): array {
        return array(
            "type" => $wp->type,
            "freq" => $wp->frequency,
            "callsign" => $wp->callsign,
            "checkpoint" => $wp->checkpoint,
            "airport_icao" => $wp->airportIcao,
            "latitude" => $wp->position->latitude,
            "longitude" => $wp->position->longitude,
            "alt" => $wp->altitude,
            "isminalt" => $wp->isMinAlt,
            "ismaxalt" => $wp->isMaxAlt,
            "isaltatlegstart" => $wp->isAltAtLegStart,
            "remark" => $wp->remark,
            "supp_info" => $wp->suppInfo
        );
    }
}
