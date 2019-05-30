<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\UseCase\ReportingPointSearch;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\ReportingPointSearchMock;
use PHPUnit\Framework\TestCase;


class ReportingPointSearchTest extends TestCase {
    private $repoMock;
    private $rpSearch;
    private $expectedResult;


    private function getRpSearch(): ReportingPointSearch {
        return $this->rpSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ];
        $this->repoMock = new ReportingPointSearchMock();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->rpSearch = new ReportingPointSearch($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->rpSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getRpSearch()->searchByExtent($extent, 11);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText() {
        $result = $this->getRpSearch()->searchByText("FRI", 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->getRpSearch()->searchByPosition($pos, 0.5, 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
