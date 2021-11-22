<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Consumption;
use Navplan\Common\DomainModel\ConsumptionUnit;
use Navplan\Common\StringNumberHelper;


class RestConsumptionConverter {
    public static function toRest(Consumption $consumption): array {
        return array(
            $consumption->value,
            ConsumptionUnit::toString($consumption->unit)
        );
    }


    public static function fromRest(array $args): Consumption {
        return new Consumption(
            StringNumberHelper::parseFloatOrError($args, 0),
            StringNumberHelper::parseIntOrError($args, 1),
        );
    }
}
