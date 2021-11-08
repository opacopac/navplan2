<?php declare(strict_types=1);

namespace Navplan\Geoname\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Geoname\DomainModel\Geoname;


interface IGeonameRepo {
    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Geoname[]
     */
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Geoname[]
     */
    function searchByText(string $searchText, int $maxResults): array;
}
