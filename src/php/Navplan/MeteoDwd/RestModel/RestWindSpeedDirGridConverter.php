<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\MeteoDwd\DomainModel\WindSpeedDirGrid;


class RestWindSpeedDirGridConverter {
    const ARG_GRID = "grid";
    const ARG_VALUS = "values";


    public static function toRest(WindSpeedDirGrid $windSpeedDirGrid): array {
        return array(
            self::ARG_GRID => RestGridDefinitionConverter::toRest($windSpeedDirGrid->grid),
            self::ARG_VALUS => RestWindSpeedDirConverter::toRestList($windSpeedDirGrid->values)
        );
    }
}
