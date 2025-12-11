<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconCh1
{
    public const int GRID_WIDTH = 1851;
    public const int GRID_HEIGHT = 847;
    public const float MIN_LON = -0.81; // MAX_LON: 17.7
    public const float MIN_LAT = 42.03; // MAX_LAT: 50.5
    public const float INC_LON = 0.01;
    public const float INC_LAT = 0.01;
    public const int MIN_STEP = 2;
    public const int MAX_STEP = 33;
    public const int STEP_LENGTH_H = 1;
    public const int GRID_RESOLUTION_M = 1100;
    public const int VERT_LAYERS = 49;
    public const string FORECAST_DIR = "icon-ch1/";
    public const int MAX_ZOOM_LEVEL = 8;
    private const array COVERAGE_COORDS = [
        [0.6405, 42.0306],
        [4.6428, 42.3120],
        [8.6699, 42.4416],
        [13.1087, 42.3963],
        [16.6361, 42.2463],
        [17.7022, 50.2460],
        [13.2573, 50.4422],
        [8.3190, 50.4919],
        [3.6763, 50.3202],
        [-0.8185, 50.0182],
        [0.6405, 42.0306],
    ];


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
            self::FORECAST_DIR,
            Ring2d::fromArray(self::COVERAGE_COORDS),
            self::MAX_ZOOM_LEVEL
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
