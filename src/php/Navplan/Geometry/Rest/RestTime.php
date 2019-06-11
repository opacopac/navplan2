<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\TimeUnit;


class RestTime {
    public static function toRest(Time $time): array {
        return array(
            $time->value,
            TimeUnit::toString($time->unit)
        );
    }
}
