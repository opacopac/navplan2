<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Service;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface IAirportService {
    function readById(int $id): Airport;

    function readByIcao(string $icao): Airport;

    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return Airport[]
     */
    function searchShortByExtent(Extent2d $extent, int $zoom): array;

    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Airport[]
     */
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Airport[]
     */
    function searchByText(string $searchText, int $maxResults): array;


    /**
     * @param Airport[] $airports
     * @return void
     */
    function insertAll(array $airports): void;


    /**
     * @return bool
     */
    function deleteAll(): bool;
}
