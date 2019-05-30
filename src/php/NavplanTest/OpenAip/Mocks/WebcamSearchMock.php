<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\IRepo\IWebcamSearch;


class WebcamSearchMock implements IWebcamSearch {
    private $mockResultList = [];


    public function searchByExtent(Extent $extent): array {
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
