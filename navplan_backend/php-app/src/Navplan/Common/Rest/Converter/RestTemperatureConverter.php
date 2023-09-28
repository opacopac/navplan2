<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use Navplan\Common\StringNumberHelper;


class RestTemperatureConverter {
    public static function toRest(?Temperature $temp): ?array {
        if (!$temp) {
            return NULL;
        }

        return [
            $temp->value,
            $temp->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Temperature {
        if (!$args) {
            return NULL;
        }

        return new Temperature(
            StringNumberHelper::parseFloatOrError($args, 0),
            TemperatureUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}
