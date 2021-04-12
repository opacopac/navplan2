<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Timestamp;


class TimestampConverter {
    public static function toRest(Timestamp $ts): int {
        return $ts->toMs();
    }
}
