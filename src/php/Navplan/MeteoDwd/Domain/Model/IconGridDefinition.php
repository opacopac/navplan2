<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Position2d;


class IconGridDefinition {
    public static function getIconD2Grid(): GridDefinition {
        return new GridDefinition(1215, 746, new Position2d(-3.94, 43.18), 0.02, 0.02, 0.0);
    }


    public static function getIconEuGrid(): GridDefinition {
        return new GridDefinition(1097, 657, new Position2d(-23.5, 29.5), 0.0625, 0.0625, 0.0);
    }
}
