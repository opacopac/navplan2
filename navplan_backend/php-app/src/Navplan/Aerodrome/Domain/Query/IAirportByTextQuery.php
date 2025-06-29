<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;


use Navplan\Aerodrome\Domain\Model\Airport;


interface IAirportByTextQuery
{
    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Airport[]
     */
    function search(string $searchText, int $maxResults): array;
}
