<?php declare(strict_types=1);

namespace NavplanTest\Airspace\Mocks;

use BadMethodCallException;
use InvalidArgumentException;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Common\Domain\Model\Extent2d;


class MockAirspaceService implements IAirspaceService {
    private $mockResultList = [];


    public function searchByExtent(Extent2d $extent, int $zoom): array {
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


    function searchByRouteIntersection(array $lonLatList): array {
        throw new BadMethodCallException("not implemented");
    }
}
