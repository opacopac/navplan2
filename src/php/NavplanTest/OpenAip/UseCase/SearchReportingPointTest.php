<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\UseCase\SearchReportingPoint\SearchReportingPointUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use PHPUnit\Framework\TestCase;


class SearchReportingPointTest extends TestCase {
    private SearchReportingPointUc $rpSearch;
    private array $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ];
        $config = new MockNavplanDiContainer();
        $config->reportingPointRepo->pushMockResult($this->expectedResult);
        $this->rpSearch = $config->getSearchReportingPointUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->rpSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->rpSearch->searchByExtent($extent);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText() {
        $result = $this->rpSearch->searchByText("FRI", 10);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->rpSearch->searchByPosition($pos, 0.5, 10);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByIcao() {
        $result = $this->rpSearch->searchByIcao(["LSZB", "LSGE"]);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
