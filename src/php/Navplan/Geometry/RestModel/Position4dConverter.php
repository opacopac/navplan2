<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Position4d;


class Position4dConverter {
    public static function toRest(Position4d $pos, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array(
            "pos" => Position2dConverter::toRest($pos, $roundPosToDigits),
            "alt" => AltitudeConverter::toRest($pos->altitude, $roundAltToDigits),
            "time" => TimestampConverter::toRest($pos->timestamp)
        );
    }
}
