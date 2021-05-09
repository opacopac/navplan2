<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase\SearchGeoname;

use Navplan\Common\DomainModel\Position2d;


interface ISearchGeonameUc {
    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    public function searchByText(string $searchText, int $maxResults): array;
}
