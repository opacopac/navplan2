<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconCh1
{
    public const int GRID_WIDTH = 1851;
    public const int GRID_HEIGHT = 847;
    public const float MIN_LON = -0.81;
    public const float MIN_LAT = 42.03;
    public const float INC_LON = 0.01;
    public const float INC_LAT = 0.01;
    public const int MIN_STEP = 2;
    public const int MAX_STEP = 33;
    public const int STEP_LENGTH_H = 1;
    public const int GRID_RESOLUTION_M = 1000;
    public const int VERT_LAYERS = 49;
    public const string FORECAST_DIR = "icon-ch1/";


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
