<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconEu
{
    public const GRID_WIDTH = 1377;
    public const GRID_HEIGHT = 657;
    public const MIN_LON = -23.5; // MAX_LON: 62.5
    public const MIN_LAT = 29.5; // MAX_LAT: 70.5
    public const INC_LON = 0.0625;
    public const INC_LAT = 0.0625;
    public const MIN_STEP = 2;
    public const MAX_STEP = 78;
    public const STEP_LENGTH_H = 1;
    public const GRID_RESOLUTION_M = 6500; // 6.5km - 7km
    public const VERT_LAYERS = 50;
    public const FORECAST_DIR = "icon-eu/";


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
            self::FORECAST_DIR
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
