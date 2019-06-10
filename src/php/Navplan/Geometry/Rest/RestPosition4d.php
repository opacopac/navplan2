<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Position4d;


class RestPosition4d {
    public static function toRest(Position4d $pos, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array(
            "pos" => RestPosition2d::toRest($pos, $roundPosToDigits),
            "alt" => RestAltitude::toRest($pos->altitude, $roundAltToDigits),
            "time" => RestTimestamp::toRest($pos->timestamp)
        );
    }
}
