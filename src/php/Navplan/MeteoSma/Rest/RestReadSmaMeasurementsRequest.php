<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest;

use Navplan\Geometry\Domain\Extent;
use Navplan\MeteoSma\Domain\ReadSmaMeasurementsRequest;
use Navplan\Shared\StringNumberHelper;


class RestReadSmaMeasurementsRequest {
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
