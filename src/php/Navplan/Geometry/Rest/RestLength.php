<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;


class RestLength {
    public static function toRest(Length $length, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $length->value : round($length->value, $roundToDigits),
            LengthUnit::toString($length->unit),
        ];
    }
}
