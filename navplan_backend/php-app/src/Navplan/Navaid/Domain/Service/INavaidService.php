<?php declare(strict_types=1);

namespace Navplan\Navaid\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Navaid\Domain\Model\Navaid;


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
    function insertAll(array $navaids): void;


    /**
     * @return bool
     */
    function deleteAll(): bool;
}
