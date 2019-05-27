<?php declare(strict_types=1);

namespace Navplan\Notam\IRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


interface INotamRepo {
    function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array;

    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array;

    function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
