<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\WaypointAltitude;


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
            "alt" => RestAltitudeConverter::toRest($wp->altitude),
            "isminalt" => $wp->isMinAlt,
            "ismaxalt" => $wp->isMaxAlt,
            "isaltatlegstart" => $wp->isAltAtLegStart,
        );
    }
}
