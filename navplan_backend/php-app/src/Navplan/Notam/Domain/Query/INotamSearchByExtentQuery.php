<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByExtentQuery
{
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @param TimestampInterval $interval
     * @return Notam[]
     */
    function searchByExtent(Extent2d $extent, int $zoom, TimestampInterval $interval): array;
}
