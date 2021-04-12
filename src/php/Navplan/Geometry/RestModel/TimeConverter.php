<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Time;
use Navplan\Geometry\DomainModel\TimeUnit;


class TimeConverter {
    public static function toRest(Time $time): array {
        return array(
            $time->value,
            TimeUnit::toString($time->unit)
        );
    }
}
