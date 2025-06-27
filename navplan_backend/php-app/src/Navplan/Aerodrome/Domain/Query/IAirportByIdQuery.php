<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;


use Navplan\Aerodrome\Domain\Model\Airport;

interface IAirportByIdQuery
{
    function readShortAirport(int $id): Airport;
}
