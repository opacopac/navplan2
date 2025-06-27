<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;

use Navplan\Aerodrome\Domain\Model\AirportFeature;


interface IAirportFeatureQuery
{
    /**
     * @param string $airportIcao
     * @return AirportFeature[]
     */
    function read(string $airportIcao): array;
}
