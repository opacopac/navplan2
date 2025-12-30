<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;

use Navplan\Aerodrome\Domain\Model\Airport;


interface IAirportByIcaosQuery
{
    /**
     * @param string[] $icaos
     * @return Airport[]
     */
    function read(array $icaos): array;
}


