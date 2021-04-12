<?php declare(strict_types=1);

namespace Navplan\Notam\DomainService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;


interface INotamRepo {
    function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array;

    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array;

    function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
