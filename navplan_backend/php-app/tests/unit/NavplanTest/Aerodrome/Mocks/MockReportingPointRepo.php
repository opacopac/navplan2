<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\Mocks;

use InvalidArgumentException;
use Navplan\AerodromeReporting\Domain\Service\IReportingPointRepo;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;


class MockReportingPointRepo implements IReportingPointRepo {
    private $mockResultList = [];


    public function searchByExtent(Extent2d $extent): array {
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
