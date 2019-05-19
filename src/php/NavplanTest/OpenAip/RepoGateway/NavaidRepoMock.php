<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RepoGateway;

use Navplan\OpenAip\RepoGateway\INavaidRepo;


class NavaidRepoMock implements INavaidRepo {
    public $searchByExtentParams = [];
    public $searchByPositionParams = [];
    public $searchByTextParams = [];
    public $resultList;


    public function __construct(array $resultList) {
        $this->resultList = $resultList;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array {
        array_push($this->searchByExtentParams, array($minLon, $minLat, $maxLon, $maxLat, $zoom));
        return $this->returnDummyResult();
    }


    public function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults): array {
        array_push($this->searchByPositionParams, array($lon, $lat, $maxRadius_deg, $maxResults));
        return $this->returnDummyResult();
    }


    public function searchByText(string $searchText, int $maxResults): array {
        array_push($this->searchByTextParams, array($searchText, $maxResults));
        return $this->returnDummyResult();
    }


    private function returnDummyResult(): ?array {
        return $this->resultList;
    }
}
