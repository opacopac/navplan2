<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


class WindSpeedDirGrid {
    /**
     * @param GridDefinition $grid
     * @param WindSpeedDir[] $values
     */
    public function __construct(
        public GridDefinition $grid,
        public array $values,
    ) {
    }
}
