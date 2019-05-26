<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\User\RepoGateway\IUserPointRepo;


class UserPointSearch {
    private $repo;


    private function getRepo(): IUserPointRepo {
        return $this->repo;
    }


    public function __construct(IUserPointRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, string $email): array {
        return $this->getRepo()->searchByExtent($minLon, $minLat, $maxLon, $maxLat, $email);
    }


    public function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults, string $email): array {
        return $this->getRepo()->searchByPosition($lon, $lat, $maxRadius_deg, $maxResults, $email);

    }


    public function searchByText(string $searchText, int $maxResults, string $email): array {
        return $this->getRepo()->searchByText($searchText, $maxResults, $email);
    }
}
