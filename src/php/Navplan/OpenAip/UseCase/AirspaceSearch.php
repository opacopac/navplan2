<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\OpenAip\RepoGateway\IAirspaceRepo;


class AirspaceSearch {
    private $repo;


    private function getRepo(): IAirspaceRepo {
        return $this->repo;
    }


    public function __construct(IAirspaceRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array {
        return $this->getRepo()->searchByExtent($minLon, $minLat, $maxLon, $maxLat, $zoom);
    }
}
