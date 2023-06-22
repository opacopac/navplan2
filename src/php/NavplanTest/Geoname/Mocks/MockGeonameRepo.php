<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Geoname\Domain\Service\IGeonameRepo;


class MockGeonameRepo implements IGeonameRepo {
    private $mockResultList = [];


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        return $this->shiftMockResult();
    }


    public function searchByText(string $searchText, int $maxResults): array {
        return $this->shiftMockResult();
    }


    public function pushMockResult(array $result): void {
        array_push($this->mockResultList, $result);
    }


    private function shiftMockResult(): array {
        if (!$this->mockResultList || count($this->mockResultList) === 0) {
            throw new InvalidArgumentException("no mock result available");
        }

        return array_shift($this->mockResultList);
    }
}
