<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Query;

use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;


interface IAircraftTypeDesignatorSearchQuery
{
    /**
     * @param string $searchText
     * @return AircraftTypeDesignator[]
     */
    function search(string $searchText): array;
}
