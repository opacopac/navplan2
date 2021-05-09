<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;


class RestTimeConverter {
    public static function toRest(Time $time): array {
        return array(
            $time->value,
            TimeUnit::toString($time->unit)
        );
    }
}
