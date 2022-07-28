<?php declare(strict_types=1);

namespace NavplanTest\Webcam\Mocks;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Webcam\Domain\Service\IWebcamRepo;


class MockWebcamRepo implements IWebcamRepo {
    private $mockResultList = [];


    public function searchByExtent(Extent2d $extent): array {
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
