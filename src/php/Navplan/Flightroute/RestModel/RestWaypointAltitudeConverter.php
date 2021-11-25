<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\DomainModel\WaypointAltitude;


class RestWaypointAltitudeConverter {
    public static function fromRest(?array $args): ?WaypointAltitude {
        if (!$args) {
            return NULL;
        }

        return new WaypointAltitude(
            RestAltitudeConverter::fromRest($args["alt"] ?? NULL),
            StringNumberHelper::parseBoolOrError($args, "isminalt"),
            StringNumberHelper::parseBoolOrError($args, "ismaxalt"),
            StringNumberHelper::parseBoolOrError($args, "isaltatlegstart"),
        );
    }


    public static function toRest(?WaypointAltitude $wp): ?array {
        if (!$wp) {
            return NULL;
        }

        return array(
            "wp_alt" => RestAltitudeConverter::toRest($wp->altitude),
            "isminalt" => $wp->isMinAlt,
            "ismaxalt" => $wp->isMaxAlt,
            "isaltatlegstart" => $wp->isAltAtLegStart,
        );
    }
}
