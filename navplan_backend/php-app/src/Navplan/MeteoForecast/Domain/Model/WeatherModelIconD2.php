<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconD2
{
    public const int GRID_WIDTH = 1215;
    public const int GRID_HEIGHT = 746;
    public const float MIN_LON = -3.94; // MAX_LON: 20.34
    public const float MIN_LAT = 43.18; // MAX_LAT: 58.08
    public const float INC_LON = 0.02;
    public const float INC_LAT = 0.02;
    public const int MIN_STEP = 2;
    public const int MAX_STEP = 48;
    public const int STEP_LENGTH_H = 1;
    public const int GRID_RESOLUTION_M = 2200;
    public const int VERT_LAYERS = 41;
    public const string FORECAST_DIR = "icon-d2/";
    public const int MAX_ZOOM_LEVEL = 7;
    private const array COVERAGE_COORDS = [
        [-0.3162, 43.1864],
        [4.7903, 43.5052],
        [9.0664, 43.615],
        [13.8014, 43.5546],
        [17.616, 43.3345],
        [20.3323, 57.6666],
        [14.008, 58.0047],
        [8.0757, 58.0505],
        [1.1692, 57.8091],
        [-3.9322, 57.3259],
        [-0.3162, 43.1864],
    ];


    public static function getModelConfig(int $minStep = self::MIN_STEP, int $maxStep = self::MAX_STEP): WeatherModelConfig
    {
        return new WeatherModelConfig(
            WeatherModelType::ICON_D2,
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
