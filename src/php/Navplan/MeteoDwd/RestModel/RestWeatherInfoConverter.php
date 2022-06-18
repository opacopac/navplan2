<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;


class RestWeatherInfoConverter {
    /**
     * @param WeatherInfo[] $weatherInfos
     * @return array
     */
    public static function toRestList(array $weatherInfos): array {
        return array_map(
            function ($weatherInfo) { return self::toRest($weatherInfo); },
            $weatherInfos
        );
    }


    public static function toRest(?WeatherInfo $weatherInfo): ?array {
        if (!$weatherInfo) {
            return null;
        }

        return [
            $weatherInfo->wwValue,
            RestAltitudeConverter::toRest($weatherInfo->ceiling),
        ];
    }
}
