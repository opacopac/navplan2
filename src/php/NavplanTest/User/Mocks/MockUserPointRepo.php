<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\User\Domain\Service\IUserPointRepo;


class MockUserPointRepo implements IUserPointRepo {
    private array $mockResultList = [];


    public function searchByExtent(Extent2d $extent, string $email): array {
        return $this->shiftMockResult();
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $email): array {
        return $this->shiftMockResult();
    }


    public function searchByText(string $searchText, int $maxResults, string $email): array {
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
