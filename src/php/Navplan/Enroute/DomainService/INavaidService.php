<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\DomainModel\Navaid;


interface INavaidService {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Navaid[]
     */
    function searchByExtent(Extent2d $extent, int $zoom): array;

    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Navaid[]
     */
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Navaid[]
     */
    function searchByText(string $searchText, int $maxResults): array;


    /**
     * @param Navaid[] $navaids
     * @return void
     */
    function insert(array $navaids): void;


    /**
     * @return bool
     */
    function deleteAll(): bool;
}
