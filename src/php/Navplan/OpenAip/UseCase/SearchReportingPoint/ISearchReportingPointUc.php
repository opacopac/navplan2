<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchReportingPoint;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


interface ISearchReportingPointUc {
    function searchByExtent(Extent $extent): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;

    function searchByIcao(array $icaoList): array;
}
