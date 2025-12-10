<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconEu
{
    public const int GRID_WIDTH = 1377;
    public const int GRID_HEIGHT = 657;
    public const float MIN_LON = -23.5; // MAX_LON: 62.5
    public const float MIN_LAT = 29.5; // MAX_LAT: 70.5
    public const float INC_LON = 0.0625;
    public const float INC_LAT = 0.0625;
    public const int MIN_STEP = 2;
    public const int MAX_STEP = 78;
    public const int STEP_LENGTH_H = 1;
    public const int GRID_RESOLUTION_M = 6900;
    public const int VERT_LAYERS = 50;
    public const string FORECAST_DIR = "icon-eu/";
    public const int MAX_ZOOM_LEVEL = 6;


    public static function getModelConfig(int $minStep = self::MIN_STEP, int $maxStep = self::MAX_STEP): WeatherModelConfig
    {
        return new WeatherModelConfig(
            WeatherModelType::ICON_EU,
            $minStep,
            $maxStep,
            new Time(self::STEP_LENGTH_H, TimeUnit::H),
            self::getGridDefinition(),
            Length::fromM(self::GRID_RESOLUTION_M),
            self::VERT_LAYERS,
            self::FORECAST_DIR,
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
