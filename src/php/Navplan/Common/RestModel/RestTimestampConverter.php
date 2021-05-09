<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Timestamp;


class RestTimestampConverter {
    public static function toRest(Timestamp $ts): int {
        return $ts->toMs();
    }
}
