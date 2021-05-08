<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainService;

use Navplan\Geometry\DomainModel\Extent;


interface IAirspaceRepo {
    function searchByExtent(Extent $extent, int $zoom): array;
}