<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Notam\DomainService\INotamRepo;


class MockNotamRepo implements INotamRepo {
    private array $mockResultList = [];


    public function searchByExtent(Extent2d $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->shiftMockResult();
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array {
        return $this->shiftMockResult();
    }


    public function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array {
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
