<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Common\Domain\Model\Extent2d;


interface IAirspaceSearchByExtentQuery {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Airspace[]
     */
    function searchByExtent(Extent2d $extent, int $zoom): array;
}
