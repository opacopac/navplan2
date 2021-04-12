<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchNavaid;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


interface ISearchNavaidUc {
    function searchByExtent(Extent $extent, int $zoom): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
