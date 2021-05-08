<?php declare(strict_types=1);

namespace Navplan\Ivao\UseCase\SearchCircuit;

use Navplan\Geometry\DomainModel\Extent;


interface ISearchCircuitUc {
    function searchByExtent(Extent $extent): array;
}
