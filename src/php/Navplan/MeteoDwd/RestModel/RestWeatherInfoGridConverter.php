<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\MeteoDwd\DomainModel\WeatherGrid;


class RestWeatherInfoGridConverter {
    const ARG_GRID = "grid";
    const ARG_VALUS = "values";


    public static function toRest(WeatherGrid $wwGrid): array {
        return array(
            self::ARG_GRID => RestGridDefinitionConverter::toRest($wwGrid->grid),
            self::ARG_VALUS => RestWeatherInfoConverter::toRestList($wwGrid->weatherInfos)
        );
    }
}
