<?php declare(strict_types=1);

namespace Navplan\Airspace\DomainService;

use Navplan\Common\DomainModel\Extent2d;


interface IAirspaceRepo {
    function searchByExtent(Extent2d $extent, int $zoom): array;
}
