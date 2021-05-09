<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface IUserPointRepo {
    function searchByExtent(Extent2d $extent, string $email): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array;

    function searchByText(string $searchText, int $maxResults, string $email): array;
}
