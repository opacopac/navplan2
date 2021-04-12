<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsRequest;
use Navplan\Shared\StringNumberHelper;


class ReadSmaMeasurementsRequestConverter {
    public static function fromArgs(array $args): ReadSmaMeasurementsRequest {
        return new ReadSmaMeasurementsRequest(
            Extent::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, "minlon"),
                StringNumberHelper::parseFloatOrError($args, "minlat"),
                StringNumberHelper::parseFloatOrError($args, "maxlon"),
                StringNumberHelper::parseFloatOrError($args, "maxlat")
            )
        );
    }
}
