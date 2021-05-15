<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface INavaidRepo {
    function searchByExtent(Extent2d $extent, int $zoom): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
