<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\MeteoDwd\DomainModel\WindInfoGrid;


class RestWindInfoGridConverter {
    const ARG_GRID = "grid";
    const ARG_VALUS = "values";


    public static function toRest(WindInfoGrid $windSpeedDirGrid): array {
        return array(
            self::ARG_GRID => RestGridDefinitionConverter::toRest($windSpeedDirGrid->grid),
            self::ARG_VALUS => RestWindInfoConverter::toRestList($windSpeedDirGrid->windInfos)
        );
    }
}
