<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Service;

use Navplan\Aerodrome\Domain\Model\AirportCircuit;
use Navplan\Common\DomainModel\Extent2d;


interface IAirportCircuitService {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent2d $extent): array;

    function writeCircuit(AirportCircuit $circuit);
}
