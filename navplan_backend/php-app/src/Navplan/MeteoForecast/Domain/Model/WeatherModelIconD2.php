<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconD2
{
    public const MIN_STEP = 2;
    public const MAX_STEP = 48;
    public const STEP_LENGTH_H = 1;
    public const GRID_RESOLUTION_M = 2200;
    public const VERT_LAYERS = 41;
    public const FORECAST_DIR = "icon-d2/";


    public static function getModelConfig(int $minStep = self::MIN_STEP, int $maxStep = self::MAX_STEP): WeatherModelConfig
    {
        return new WeatherModelConfig(
            WeatherModelType::ICON_D2,
            $minStep,
            $maxStep,
            new Time(self::STEP_LENGTH_H, TimeUnit::H),
            Length::fromM(self::GRID_RESOLUTION_M)
        );
    }
}
