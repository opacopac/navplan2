<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\OpenAip\RepoGateway\INavaidRepository;


class NavaidSearch {
    private $navaidRepo;


    private function getRepo(): INavaidRepository {
        return $this->navaidRepo;
    }


    public function __construct(INavaidRepository $navaidRepo) {
        $this->navaidRepo = $navaidRepo;
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
