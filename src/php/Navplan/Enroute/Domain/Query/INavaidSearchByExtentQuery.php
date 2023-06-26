<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Enroute\Domain\Model\Navaid;


interface INavaidSearchByExtentQuery {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Navaid[]
     */
    function searchByExtent(Extent2d $extent, int $zoom): array;
}
