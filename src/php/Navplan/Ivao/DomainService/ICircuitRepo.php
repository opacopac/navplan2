<?php declare(strict_types=1);

namespace Navplan\Ivao\DomainService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Ivao\DomainModel\Circuit;


interface ICircuitRepo {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent $extent): array;

    function writeCircuit(Circuit $circuit);
}
