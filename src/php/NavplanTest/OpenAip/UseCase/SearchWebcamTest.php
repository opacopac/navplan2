<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\UseCase\SearchWebcam\SearchWebcamUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class SearchWebcamTest extends TestCase {
    private SearchWebcamUc $camSearch;
    private array $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyWebcam1::create(), DummyWebcam2::create() ];
        $config = new MockNavplanDiContainer();
        $config->webcamRepo->pushMockResult($this->expectedResult);
        $this->camSearch = $config->getSearchWebcamUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->camSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->camSearch->searchByExtent($extent);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
