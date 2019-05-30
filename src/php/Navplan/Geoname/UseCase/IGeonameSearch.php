<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase;

use Navplan\Geometry\Domain\Position2d;


interface IGeonameSearch {
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
