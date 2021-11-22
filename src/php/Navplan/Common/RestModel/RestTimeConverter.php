<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\Common\StringNumberHelper;


class RestTimeConverter {
    public static function toRest(Time $time): array {
        return array(
            $time->value,
            TimeUnit::toString($time->unit)
        );
    }


    public static function fromRest(array $args): Time {
        return new Time(
            StringNumberHelper::parseFloatOrError($args, 0),
            StringNumberHelper::parseIntOrError($args, 1),
        );
    }
}
