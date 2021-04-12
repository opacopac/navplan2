<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;


class LengthConverter {
    public static function toRest(Length $length, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $length->value : round($length->value, $roundToDigits),
            LengthUnit::toString($length->unit),
        ];
    }
}
