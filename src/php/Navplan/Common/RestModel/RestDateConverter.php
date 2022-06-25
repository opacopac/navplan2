<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use DateTime;


class RestDateConverter {
    public static function toRest(DateTime $date): string {
        return $date->format(DateTime::ISO8601);
    }
}
