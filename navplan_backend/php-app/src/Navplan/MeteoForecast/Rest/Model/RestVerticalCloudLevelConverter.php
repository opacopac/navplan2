<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\MeteoForecast\Domain\Model\VerticalCloudLevel;


class RestVerticalCloudLevelConverter {
    /**
     * @param VerticalCloudLevel[] $verticalCloudLevels
     * @return array
     */
    public static function toRestList(array $verticalCloudLevels): array {
        return array_map(
            function ($verticalCloudLevel) { return self::toRest($verticalCloudLevel); },
            $verticalCloudLevels
        );
    }


    public static function toRest(?VerticalCloudLevel $verticlCloudLevel): ?array {
        if (!$verticlCloudLevel) {
            return null;
        }

        return [
            RestAltitudeConverter::toRest($verticlCloudLevel->altitude),
            $verticlCloudLevel->cloudPercent
        ];
    }
}
