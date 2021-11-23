<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\Traffic\UseCase\ReadOgnTraffic\TrafficOgnReadRequest;


class RestTrafficOgnReadRequestConverter {
    public const ARG_MIN_LAT = "minlat";
    public const ARG_MAX_LAT = "maxlat";
    public const ARG_MIN_LON = "minlon";
    public const ARG_MAX_LON = "maxlon";
    public const ARG_MAX_AGE_SEC = "maxagesec";
    public const ARG_SESSION_ID = "sessionid";


    public static function fromArgs(array $args): TrafficOgnReadRequest {
        $request = new TrafficOgnReadRequest(
            Extent2d::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT)
            ),
            new Time(
                StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_AGE_SEC),
                TimeUnit::S
            ),
            StringNumberHelper::parseIntOrError($args, self::ARG_SESSION_ID)
        );

        if ($request->sessionId <= 0) {
            throw new InvalidArgumentException('sessionid must be a positive integer');
        }

        if ($request->maxAge->value <= 0) {
            throw new InvalidArgumentException('maxagesec must be a positive integer');
        }

        return $request;
    }
}
