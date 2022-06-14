<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\MeteoDwd\DomainModel\WwGrid;


class RestWwGridConverter {
    const ARG_GRID = "grid";
    const ARG_VALUS = "values";


    public static function toRest(WwGrid $wwGrid): array {
        return array(
            self::ARG_GRID => RestGridDefinitionConverter::toRest($wwGrid->grid),
            self::ARG_VALUS => $wwGrid->values
        );
    }
}
