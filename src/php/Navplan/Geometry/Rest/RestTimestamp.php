<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Timestamp;


class RestTimestamp {
    public static function toRest(Timestamp $ts): int {
        return $ts->toMs();
    }
}
