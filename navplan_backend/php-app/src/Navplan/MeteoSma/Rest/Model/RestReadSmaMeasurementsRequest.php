<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\StringNumberHelper;


class RestReadSmaMeasurementsRequest {
    public function __construct(public Extent2d $extent) {
    }


    public static function fromRest(array $args): RestReadSmaMeasurementsRequest {
        return new RestReadSmaMeasurementsRequest(
            Extent2d::createFromCoords(
                StringNumberHelper::parseFloatOrError($args, "minlon"),
                StringNumberHelper::parseFloatOrError($args, "minlat"),
                StringNumberHelper::parseFloatOrError($args, "maxlon"),
                StringNumberHelper::parseFloatOrError($args, "maxlat")
            )
        );
    }
}
