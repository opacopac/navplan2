<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use InvalidArgumentException;
use Navplan\MeteoForecast\Domain\Model\WeatherModelConfig;
use Navplan\MeteoForecast\Domain\Model\WeatherModelIconCh1;
use Navplan\MeteoForecast\Domain\Model\WeatherModelIconD2;
use Navplan\MeteoForecast\Domain\Model\WeatherModelType;


class WeatherModelConfigService
{
    public static function createFromModelType(int $modelType): WeatherModelConfig
    {
        return match ($modelType) {
            WeatherModelType::ICON_D2 => WeatherModelIconD2::getModelConfig(),
            WeatherModelType::ICON_CH1 => WeatherModelIconCh1::getModelConfig(),
            default => throw new InvalidArgumentException("Unsupported model: " . $modelType)
        };
    }
}
