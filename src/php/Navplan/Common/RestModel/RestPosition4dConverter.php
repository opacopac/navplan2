<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Position4d;


class RestPosition4dConverter {
    public static function toRest(Position4d $pos, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array(
            "pos" => RestPosition2dConverter::toRest($pos, $roundPosToDigits),
            "alt" => RestAltitudeConverter::toRest($pos->altitude, $roundAltToDigits),
            "time" => RestTimestampConverter::toRest($pos->timestamp)
        );
    }
}
