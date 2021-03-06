<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Position2d;


class RestPosition2dConverter {
    public static function toRest(Position2d $pos, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $pos->longitude : round($pos->longitude, $roundToDigits),
            $roundToDigits === NULL ? $pos->latitude : round($pos->latitude, $roundToDigits)
        ];
    }
}
