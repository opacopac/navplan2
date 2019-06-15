<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


interface IUserPointRepo {
    function searchByExtent(Extent $extent, string $email): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array;

    function searchByText(string $searchText, int $maxResults, string $email): array;
}