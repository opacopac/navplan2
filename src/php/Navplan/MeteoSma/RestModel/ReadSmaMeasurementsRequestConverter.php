<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsRequest;


class ReadSmaMeasurementsRequestConverter {
    public static function fromArgs(array $args): ReadSmaMeasurementsRequest {
        return new ReadSmaMeasurementsRequest(
            Extent2d::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, "minlon"),
                StringNumberHelper::parseFloatOrError($args, "minlat"),
                StringNumberHelper::parseFloatOrError($args, "maxlon"),
                StringNumberHelper::parseFloatOrError($args, "maxlat")
            )
        );
    }
}
