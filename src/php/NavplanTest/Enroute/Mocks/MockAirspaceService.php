<?php declare(strict_types=1);

namespace NavplanTest\Enroute\Mocks;

use http\Exception\BadMethodCallException;
use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Enroute\DomainService\IAirspaceService;


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
