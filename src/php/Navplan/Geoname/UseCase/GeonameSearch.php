<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\IRepo\IGeonameRepo;


class GeonameSearch {
    private $repo;


    private function getRepo(): IGeonameRepo {
        return $this->repo;
    }


    public function __construct(IGeonameRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->getRepo()->searchByPosition($position, $maxRadius_deg, $maxResults);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->getRepo()->searchByText($searchText, $maxResults);
    }
}
