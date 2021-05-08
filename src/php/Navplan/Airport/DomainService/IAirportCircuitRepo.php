<?php declare(strict_types=1);

namespace Navplan\Airport\DomainService;

use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Geometry\DomainModel\Extent;


interface IAirportCircuitRepo {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent $extent): array;

    function writeCircuit(AirportCircuit $circuit);
}
