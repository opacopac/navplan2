<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


interface IUserPointRepo {
    function searchByExtent(Extent $extent, string $email): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array;

    function searchByText(string $searchText, int $maxResults, string $email): array;
}
