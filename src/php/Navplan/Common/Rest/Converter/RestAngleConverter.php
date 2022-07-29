<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\DomainModel\Angle;


class RestAngleConverter {
    public static function toRest(?Angle $angle): ?array {
        if (!$angle) {
            return NULL;
        }

        return [
            $angle->value,
            $angle->unit->value
        ];
    }
}
