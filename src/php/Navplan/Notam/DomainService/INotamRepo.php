<?php declare(strict_types=1);

namespace Navplan\Notam\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface INotamRepo {
    function searchByExtent(Extent2d $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array;

    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array;

    function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
