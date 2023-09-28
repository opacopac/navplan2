<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceService {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Airspace[]
     */
    function searchByExtent(Extent2d $extent, int $zoom): array;

    /**
     * @param Position2d[] $lonLatList
     * @return Airspace[]
     */
    function searchByRouteIntersection(array $lonLatList): array;

    /**
     * @param Position2d $position2d
     * @return Airspace[]
     */
    function searchByPosition(Position2d $position2d): array;


    /**
     * @param Airspace[] $airspaces
     * @return void
     */
    function insertAll(array $airspaces): void;


    /**
     * @return bool
     */
    function deleteAll(): bool;
}
