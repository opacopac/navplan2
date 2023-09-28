<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Precipitation;
use Navplan\Common\Domain\Model\PrecipitationUnit;
use Navplan\Common\StringNumberHelper;


class RestPrecipitationConverter {
    public static function toRest(?Precipitation $precip): ?array {
        if (!$precip) {
            return NULL;
        }

        return [
            $precip->value,
            $precip->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Precipitation {
        if (!$args) {
            return NULL;
        }

        return new Precipitation(
            StringNumberHelper::parseFloatOrError($args, 0),
            PrecipitationUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}
