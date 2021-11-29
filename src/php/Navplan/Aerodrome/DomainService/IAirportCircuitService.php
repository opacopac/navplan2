<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainService;

use Navplan\Aerodrome\DomainModel\AirportCircuit;
use Navplan\Common\DomainModel\Extent2d;


interface IAirportCircuitService {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent2d $extent): array;

    function writeCircuit(AirportCircuit $circuit);
}
