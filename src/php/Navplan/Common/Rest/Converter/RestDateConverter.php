<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use DateTime;


class RestDateConverter {
    public static function toRest(DateTime $date): string {
        return $date->format(DateTime::ISO8601);
    }


    public static function fromRest(string $dateStr): DateTime {
        return new DateTime($dateStr);
    }
}
