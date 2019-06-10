<?php declare(strict_types=1);

namespace Navplan\Meteo\Rest;

use Navplan\Geometry\Domain\Extent;
use Navplan\Meteo\Domain\ReadSmaMeasurementsRequest;
use Navplan\Shared\StringNumberService;


class RestReadSmaMeasurementsRequest {
    public static function fromArgs(array $args): ReadSmaMeasurementsRequest {
        return new ReadSmaMeasurementsRequest(
            Extent::createFromCoords(
                StringNumberService::parseFloatOrError($args, "minlon"),
                StringNumberService::parseFloatOrError($args, "minlat"),
                StringNumberService::parseFloatOrError($args, "maxlon"),
                StringNumberService::parseFloatOrError($args, "maxlat")
            )
        );
    }
}
