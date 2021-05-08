<?php declare(strict_types=1);

namespace Navplan\Airport\DomainService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


interface IAirportRepo {
    function searchByExtent(Extent $extent, int $zoom): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;

    function searchByIcao(array $icaoList): array;
}
