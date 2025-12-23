<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Service\NotamPositionRequest;


class ReadNotamByPositionRequest {
    const ARG_LON = "longitude";
    const ARG_LAT = "latitude";


    public static function fromRest(array $args): NotamPositionRequest {
        $position = new Position2d(
            StringNumberHelper::parseFloatOrError($args, self::ARG_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_LAT)
        );

        return new NotamPositionRequest(
            $position,
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
