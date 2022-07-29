<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\DomainModel\Length;


class RestLengthConverter {
    public static function toRest(Length $length, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $length->value : round($length->value, $roundToDigits),
            $length->unit->value,
        ];
    }
}
