<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestAngleConverter;
use Navplan\Common\Rest\Converter\RestSpeedConverter;
use Navplan\MeteoDwd\DomainModel\VerticalWindLevel;


class RestVerticalWindLevelConverter {
    /**
     * @param VerticalWindLevel[] $verticalWindLevels
     * @return array
     */
    public static function toRestList(array $verticalWindLevels): array {
        return array_map(
            function ($verticalWindLevel) { return self::toRest($verticalWindLevel); },
            $verticalWindLevels
        );
    }


    public static function toRest(?VerticalWindLevel $verticlWindLevel): ?array {
        if (!$verticlWindLevel) {
            return null;
        }

        return [
            RestAltitudeConverter::toRest($verticlWindLevel->altitude),
            RestAngleConverter::toRest($verticlWindLevel->direction),
            RestSpeedConverter::toRest($verticlWindLevel->speed)
        ];
    }
}
