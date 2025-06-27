<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;

use Navplan\Aerodrome\Domain\Model\AirportRadio;


interface IAirportRadioQuery
{
    /**
     * @param int $airportId
     * @return AirportRadio[]
     */
    function read(int $airportId): array;
}
