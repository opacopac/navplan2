<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Geometry\Domain\Extent;
use Navplan\Shared\StringNumberHelper;
use Navplan\Traffic\Domain\TrafficAdsbexReadRequest;


class RestTrafficAdsbexReadRequest {
    public const ARG_MIN_LAT = "minlat";
    public const ARG_MAX_LAT = "maxlat";
    public const ARG_MIN_LON = "minlon";
    public const ARG_MAX_LON = "maxlon";


    public static function fromArgs(array $args): TrafficAdsbexReadRequest {
        $request = new TrafficAdsbexReadRequest(
            Extent::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT)
            )
        );

        return $request;
    }
}
