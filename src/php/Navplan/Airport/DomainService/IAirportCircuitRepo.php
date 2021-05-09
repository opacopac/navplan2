<?php declare(strict_types=1);

namespace Navplan\Airport\DomainService;

use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Common\DomainModel\Extent2d;


interface IAirportCircuitRepo {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent2d $extent): array;

    function writeCircuit(AirportCircuit $circuit);
}
