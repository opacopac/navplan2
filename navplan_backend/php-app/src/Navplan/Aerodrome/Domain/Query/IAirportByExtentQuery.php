<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;


use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Common\Domain\Model\Extent2d;

interface IAirportByExtentQuery
{
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Airport[]
     */
    function searchShortAirports(Extent2d $extent, int $zoom): array;
}
