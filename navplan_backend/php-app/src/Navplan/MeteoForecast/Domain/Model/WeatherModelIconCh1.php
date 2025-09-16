<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconCh1
{
    public const GRID_WIDTH = 1851;
    public const GRID_HEIGHT = 847;
    public const MIN_LON = -0.81;
    public const MIN_LAT = 42.03;
    public const INC_LON = 0.01;
    public const INC_LAT = 0.01;
    public const MIN_STEP = 2;
    public const MAX_STEP = 33;
    public const STEP_LENGTH_H = 1;
    public const GRID_RESOLUTION_M = 1000;
    public const VERT_LAYERS = 49;
    public const FORECAST_DIR = "icon-ch1/";


    public static function getModelConfig(int $minStep = self::MIN_STEP, int $maxStep = self::MAX_STEP): WeatherModelConfig
    {
        return new WeatherModelConfig(
            WeatherModelType::ICON_CH1,
            $minStep,
            $maxStep,
            new Time(self::STEP_LENGTH_H, TimeUnit::H),
            self::getGridDefinition(),
            Length::fromM(self::GRID_RESOLUTION_M),
            self::VERT_LAYERS,
            self::FORECAST_DIR
        );
    }


    public static function getGridDefinition(): GridDefinition
    {
        //return new GridDefinition(1024, 1024, new Position2d(-0.817148566, 42.0279274), 0.0180935862949219, 0.0082740783203125, 0.0);
        return new GridDefinition(
            self::GRID_WIDTH,
            self::GRID_HEIGHT,
            new Position2d(self::MIN_LON, self::MIN_LAT),
            self::INC_LON,
            self::INC_LAT,
            0.0
        );
    }
}
