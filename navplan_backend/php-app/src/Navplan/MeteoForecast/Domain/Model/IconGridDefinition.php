<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Position2d;


// TODO: move to respective weather model classes
class IconGridDefinition {
    public static function getIconD2Grid(): GridDefinition {
        return new GridDefinition(1215, 746, new Position2d(-3.94, 43.18), 0.02, 0.02, 0.0);
    }


    public static function getIconEuGrid(): GridDefinition {
        return new GridDefinition(1097, 657, new Position2d(-23.5, 29.5), 0.0625, 0.0625, 0.0);
    }


    public static function getIconCh1Grid(): GridDefinition {
        return new GridDefinition(1024, 1024, new Position2d(-0.817148566, 42.0279274), 0.0180935862949219, 0.0082740783203125, 0.0);
    }
}
