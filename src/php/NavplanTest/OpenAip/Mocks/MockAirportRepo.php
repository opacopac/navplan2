<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use InvalidArgumentException;
use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainService\IAirportRepo;


class MockAirportRepo implements IAirportRepo {
    private $mockResultList = [];


    public function searchByExtent(Extent $extent, int $zoom): array {
        return $this->shiftMockResult();
    }


    public function searchByIcao(array $icaoList): array {
        return $this->shiftMockResult();
    }


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
