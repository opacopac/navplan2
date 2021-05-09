<?php declare(strict_types=1);

namespace Navplan\Airport\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface IAirportRepo {
    function searchByExtent(Extent2d $extent, int $zoom): array;

    function searchShortByExtent(Extent2d $extent, int $zoom): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;

    function searchByIcao(array $icaoList): array;
}
