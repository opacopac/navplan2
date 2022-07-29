<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\DomainModel\Consumption;
use Navplan\Common\DomainModel\ConsumptionUnit;
use Navplan\Common\StringNumberHelper;


class RestConsumptionConverter {
    public static function toRest(?Consumption $consumption): ?array {
        if (!$consumption) {
            return NULL;
        }

        return array(
            $consumption->value,
            $consumption->unit->value
        );
    }


    public static function fromRest(?array $args): ?Consumption {
        if (!$args) {
            return NULL;
        }

        return new Consumption(
            StringNumberHelper::parseFloatOrError($args, 0),
            ConsumptionUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}
