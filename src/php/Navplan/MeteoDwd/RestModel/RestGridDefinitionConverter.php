<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\GridDefinition;


class RestGridDefinitionConverter {
    const ARG_HEIGHT = "height";
    const ARG_WIDTH = "width";
    const ARG_MINPOS = "minpos";
    const ARG_MINLON = "minlon";
    const ARG_MINLAT = "minlat";
    const ARG_STEP_LAT = "steplon";
    const ARG_STEP_LON = "steplat";


    public static function toRest(GridDefinition $grid): array {
        return array(
            self::ARG_HEIGHT => $grid->height,
            self::ARG_WIDTH => $grid->width,
            self::ARG_MINPOS => RestPosition2dConverter::toRest($grid->extent->minPos),
            self::ARG_STEP_LON => $grid->stepLon,
            self::ARG_STEP_LAT => $grid->stepLat
        );
    }


    public static function fromRest(array $args): GridDefinition {
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MINLON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MINLAT);
        return new GridDefinition(
            StringNumberHelper::parseIntOrError($args, self::ARG_WIDTH),
            StringNumberHelper::parseIntOrError($args, self::ARG_HEIGHT),
            new Position2d($minLon, $minLat),
            StringNumberHelper::parseFloatOrError($args, self::ARG_STEP_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_STEP_LAT),
        );
    }
}
