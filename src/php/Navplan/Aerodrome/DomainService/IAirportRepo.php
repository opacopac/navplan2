<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainService;

use Navplan\Aerodrome\DomainModel\Airport;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface IAirportRepo {
    function readById(int $id): Airport;

    function readByIcao(string $icao): Airport;

    function searchShortByExtent(Extent2d $extent, int $zoom): array;

    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    function searchByText(string $searchText, int $maxResults): array;
}
