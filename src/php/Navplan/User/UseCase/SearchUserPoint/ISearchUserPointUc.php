<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SearchUserPoint;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface ISearchUserPointUc {
    function searchByExtent(Extent2d $extent, string $token): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $token): array;

    function searchByText(string $searchText, int $maxResults, string $token): array;
}
