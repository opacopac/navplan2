<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


class WwGrid {
    /**
     * @param GridDefinition $grid
     * @param int[] $values
     */
    public function __construct(
        public GridDefinition $grid,
        public array $values,
    ) {
    }
}
