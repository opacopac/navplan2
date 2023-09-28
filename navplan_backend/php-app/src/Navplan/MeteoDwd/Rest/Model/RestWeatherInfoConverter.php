<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Model;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\MeteoDwd\Domain\Model\WeatherInfo;


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
            RestPosition2dConverter::toRest($weatherInfo->pos)
        ];
    }
}
