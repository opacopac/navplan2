<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


class WeatherGrid {
    /**
     * @param GridDefinition $grid
     * @param WeatherInfo[] $weatherInfos
     */
    public function __construct(
        public GridDefinition $grid,
        public array $weatherInfos,
    ) {
    }
}
