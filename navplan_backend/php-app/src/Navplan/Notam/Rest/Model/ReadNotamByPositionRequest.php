<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;


class ReadNotamByPositionRequest {
    const ARG_LON = "longitude";
    const ARG_LAT = "latitude";


    public function __construct(
        public Position2d $position,
        public TimestampInterval $interval
    ) {
    }


    public static function fromRest(array $args): ReadNotamByPositionRequest {
        $position = new Position2d(
            StringNumberHelper::parseFloatOrError($args, self::ARG_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_LAT)
        );

        return new ReadNotamByPositionRequest(
            $position,
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
