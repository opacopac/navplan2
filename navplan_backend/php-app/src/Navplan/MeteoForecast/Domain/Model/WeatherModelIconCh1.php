<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconCh1
{
    public const MIN_STEP = 2;
    public const MAX_STEP = 48;
    public const STEP_LENGTH_H = 1;
    public const GRID_RESOLUTION_M = 1000;
    public const VERT_LAYERS = 41;
    public const FORECAST_DIR = "icon-ch1/";


    public static function getModelConfig(int $minStep = self::MIN_STEP, int $maxStep = self::MAX_STEP): WeatherModelConfig
    {
        return new WeatherModelConfig(
            WeatherModelType::ICON_CH1,
            $minStep,
            $maxStep,
            new Time(self::STEP_LENGTH_H, TimeUnit::H),
            IconGridDefinition::getIconCh1Grid(),
            Length::fromM(self::GRID_RESOLUTION_M),
            self::VERT_LAYERS,
            self::FORECAST_DIR
        );
    }
}
