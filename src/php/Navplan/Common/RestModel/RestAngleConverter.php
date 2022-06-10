<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;


class RestAngleConverter {
    public static function toRest(?Angle $angle): ?array {
        if (!$angle) {
            return NULL;
        }

        return [
            $angle->value,
            AngleUnit::toString($angle->unit)
        ];
    }
}
