<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\GridDefinition;


class RestGridDefinitionConverter {
    const ARG_HEIGHT = "height";
    const ARG_WIDTH = "width";
    const ARG_MINLON = "minlon";
    const ARG_MINLAT = "minlat";
    const ARG_STEP_LAT = "steplon";
    const ARG_STEP_LON = "steplat";
    const ARG_ODD_ROW_OFFSET = "oddRowOffset";


    public static function fromRest(array $args): GridDefinition {
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MINLON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MINLAT);
        return new GridDefinition(
            StringNumberHelper::parseIntOrError($args, self::ARG_WIDTH),
            StringNumberHelper::parseIntOrError($args, self::ARG_HEIGHT),
            new Position2d($minLon, $minLat),
            StringNumberHelper::parseFloatOrError($args, self::ARG_STEP_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_STEP_LAT),
            StringNumberHelper::parseFloatOrError($args, self::ARG_ODD_ROW_OFFSET),
        );
    }
}
