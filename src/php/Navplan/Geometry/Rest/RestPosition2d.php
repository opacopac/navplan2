<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Position2d;


class RestPosition2d {
    public static function toRest(Position2d $pos, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $pos->longitude : round($pos->longitude, $roundToDigits),
            $roundToDigits === NULL ? $pos->latitude : round($pos->latitude, $roundToDigits)
        ];
    }
}
