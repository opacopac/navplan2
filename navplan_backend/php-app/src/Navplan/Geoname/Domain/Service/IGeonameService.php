<?php declare(strict_types=1);

namespace Navplan\Geoname\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Geoname\Domain\Model\Geoname;


interface IGeonameService {
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
