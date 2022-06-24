<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use DateTime;


class RestDateConverter {
    public static function toRest(DateTime $date): array {
        return [
            intval($date->format("Y")),
            intval($date->format("m")),
            intval($date->format("d")),
        ];
    }
}
