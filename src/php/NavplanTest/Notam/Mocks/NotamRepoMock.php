<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Notam\IRepo\INotamRepo;


class NotamRepoMock implements INotamRepo {
    private $mockResultList = [];


    public function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
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
