<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelIconD2
{
    public const GRID_WIDTH = 1215;
    public const GRID_HEIGHT = 746;
    public const MIN_LON = -3.94;
    public const MIN_LAT = 43.18;
    public const INC_LON = 0.02;
    public const INC_LAT = 0.02;
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


    // TODO: move to own weather model class
    public static function getIconEuGrid(): GridDefinition {
        return new GridDefinition(1097, 657, new Position2d(-23.5, 29.5), 0.0625, 0.0625, 0.0);
    }
}
