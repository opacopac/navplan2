<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\OpenAip\RepoGateway\IAirportRepo;


class AirportSearch {
    private $repo;


    private function getRepo(): IAirportRepo {
        return $this->repo;
    }


    public function __construct(IAirportRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array {
        return $this->getRepo()->searchByExtent($minLon, $minLat, $maxLon, $maxLat, $zoom);
    }


    public function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults): array {
        return $this->getRepo()->searchByPosition($lon, $lat, $maxRadius_deg, $maxResults);

    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->getRepo()->searchByText($searchText, $maxResults);
    }
}
