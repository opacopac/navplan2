<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Position3d;


class RestPosition3dConverter {
    public static function toRest(Position3d $pos, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array(
            "pos" => RestPosition2dConverter::toRest($pos, $roundPosToDigits),
            "alt" => RestAltitudeConverter::toRest($pos->altitude, $roundAltToDigits),
        );
    }


    public static function toRestList(array $pos3dList, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array_map(
            function ($pos3d) use ($roundPosToDigits, $roundAltToDigits) {
                return self::toRest($pos3d, $roundPosToDigits, $roundAltToDigits);
            },
            $pos3dList
        );
    }
}
