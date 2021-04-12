<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchAirspace;

use Navplan\Geometry\DomainModel\Extent;


interface ISearchAirspaceUc {
    function searchByExtent(Extent $extent, int $zoom): array;
}
