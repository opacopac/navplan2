<?php declare(strict_types=1);

namespace Navplan\OpenAip\IRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


interface IReportingPointRepo {
    function searchByExtent(Extent $extent): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;

    function searchByIcao(array $icaoList): array;
}
