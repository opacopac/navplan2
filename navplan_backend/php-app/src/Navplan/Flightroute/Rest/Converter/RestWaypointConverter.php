<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Waypoint;


class RestWaypointConverter {
    public static function fromRest(array $args, bool $isAlternate): Waypoint {
        return new Waypoint(
            StringNumberHelper::parseStringOrError($args, "type"),
            StringNumberHelper::parseStringOrError($args, "freq"),
            StringNumberHelper::parseStringOrError($args, "callsign"),
            StringNumberHelper::parseStringOrError($args, "checkpoint"),
            StringNumberHelper::parseStringOrNull($args, "mt_text"),
            StringNumberHelper::parseStringOrNull($args, "dist_text"),
            RestWaypointAltitudeConverter::fromRest($args["wp_alt"]),
            StringNumberHelper::parseStringOrNull($args, "eet_text"),
            StringNumberHelper::parseStringOrError($args, "remark"),
            StringNumberHelper::parseStringOrNull($args, "supp_info"),
            RestPosition2dConverter::fromRest($args["pos"]),
            StringNumberHelper::parseStringOrNull($args, "airport_icao"),
            $isAlternate
        );
    }


    public static function toRest(Waypoint $wp): array {
        return array(
            "type" => $wp->type,
            "freq" => $wp->frequency,
            "callsign" => $wp->callsign,
            "checkpoint" => $wp->checkpoint,
            "mt_text" => $wp->mtText,
            "dist_text" => $wp->distText,
            "wp_alt" => RestWaypointAltitudeConverter::toRest($wp->wpAltitude),
            "eet_text" => $wp->eetText,
            "remark" => $wp->remark,
            "supp_info" => $wp->suppInfo,
            "airport_icao" => $wp->airportIcao,
            "pos" => RestPosition2dConverter::toRest($wp->position),
        );
    }
}
