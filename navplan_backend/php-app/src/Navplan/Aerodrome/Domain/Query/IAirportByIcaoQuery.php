<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;


use Navplan\Aerodrome\Domain\Model\Airport;

interface IAirportByIcaoQuery
{
    function read(string $icao): Airport;
}
