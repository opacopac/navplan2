<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\Waypoint;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Shared\StringNumberService;


class RestWaypoint {
    public static function fromArgs(array $args): Waypoint {
        return new Waypoint(
            StringNumberService::parseStringOrError($args, "type"),
            StringNumberService::parseStringOrError($args, "freq"),
            StringNumberService::parseStringOrError($args, "callsign"),
            StringNumberService::parseStringOrError($args, "checkpoint"),
            StringNumberService::parseStringOrError($args, "alt"),
            StringNumberService::parseBoolOrError($args, "isminalt"),
            StringNumberService::parseBoolOrError($args, "ismaxalt"),
            StringNumberService::parseBoolOrError($args, "isaltatlegstart"),
            StringNumberService::parseStringOrError($args, "remark"),
            StringNumberService::parseStringOrNull($args, "supp_info"),
            new Position2d(
                StringNumberService::parseFloatOrError($args, "longitude"),
                StringNumberService::parseFloatOrError($args, "longitude")
            ),
            StringNumberService::parseStringOrNull($args, "airport_icao")
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
