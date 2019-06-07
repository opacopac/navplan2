<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\UseCase\WebcamSearch;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use NavplanTest\OpenAip\Mocks\MockWebcamRepo;
use PHPUnit\Framework\TestCase;


class SearchWebcamTest extends TestCase {
    private $repoMock;
    private $camSearch;
    private $expectedResult;


    private function getCamSearch(): WebcamSearch {
        return $this->camSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyWebcam1::create(), DummyWebcam2::create() ];
        $this->repoMock = new MockWebcamRepo();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->camSearch = new WebcamSearch($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->camSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getCamSearch()->searchByExtent($extent);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
