<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\Common\StringNumberHelper;


class RestTimeConverter {
    public static function toRest(Time $time): array {
        return [
            $time->value,
            $time->unit->value
        ];
    }


    public static function fromRest(array $args): Time {
        return new Time(
            StringNumberHelper::parseFloatOrError($args, 0),
            TimeUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}
