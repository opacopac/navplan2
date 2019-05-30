<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class AirportSearch {
    private $repo;


    private function getRepo(): IAirportSearch {
        return $this->repo;
    }


    public function __construct(IAirportSearch $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->getRepo()->searchByExtent($extent, $zoom);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->getRepo()->searchByPosition($position, $maxRadius_deg, $maxResults);

    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->getRepo()->searchByText($searchText, $maxResults);
    }
}
