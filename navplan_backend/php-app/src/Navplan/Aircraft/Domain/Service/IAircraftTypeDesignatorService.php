<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;


interface IAircraftTypeDesignatorService
{
    function create(AircraftTypeDesignator $typeDesignator): AircraftTypeDesignator;

    function deleteAll(): void;

    /**
     * @param string $searchText
     * @return AircraftTypeDesignator[]
     */
    function searchByText(string $searchText): array;
}
