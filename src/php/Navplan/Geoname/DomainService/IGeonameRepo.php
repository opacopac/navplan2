<?php declare(strict_types=1);

namespace Navplan\Geoname\DomainService;

use Navplan\Common\DomainModel\Position2d;


interface IGeonameRepo {
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
