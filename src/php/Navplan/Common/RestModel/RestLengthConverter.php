<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class RestLengthConverter {
    public static function toRest(Length $length, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $length->value : round($length->value, $roundToDigits),
            LengthUnit::toString($length->unit),
        ];
    }
}
