<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\StringNumberHelper;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\TrafficAdsbexReadRequest;


class RestTrafficAdsbexReadRequestConverter {
    public const ARG_MIN_LAT = "minlat";
    public const ARG_MAX_LAT = "maxlat";
    public const ARG_MIN_LON = "minlon";
    public const ARG_MAX_LON = "maxlon";


    public static function fromArgs(array $args): TrafficAdsbexReadRequest {
        $request = new TrafficAdsbexReadRequest(
            Extent2d::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT)
            )
        );

        return $request;
    }
}
