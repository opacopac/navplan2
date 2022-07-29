<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceSearchByExtentQuery {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Airspace[]
     */
    function searchByExtent(Extent2d $extent, int $zoom): array;
}
