<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit\Domain\Service;

use Navplan\AerodromeCircuit\Domain\Model\AirportCircuit;
use Navplan\Common\Domain\Model\Extent2d;


interface IAirportCircuitService {
    function getCircuitsByIcao(string $adIcao): array;

    function getCircuitsByExtent(Extent2d $extent): array;

    function writeCircuit(AirportCircuit $circuit);
}
