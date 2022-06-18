<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


class WindInfoGrid {
    /**
     * @param GridDefinition $grid
     * @param WindInfo[] $windInfos
     */
    public function __construct(
        public GridDefinition $grid,
        public array $windInfos,
    ) {
    }
}
