<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;


class RestSpeedConverter {
    public static function toRest(?Speed $speed): ?array {
        if (!$speed) {
            return NULL;
        }

        return [
            $speed->value,
            $speed->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Speed {
        if (!$args) {
            return NULL;
        }

        return new Speed(
            StringNumberHelper::parseFloatOrError($args, 0),
            SpeedUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}
