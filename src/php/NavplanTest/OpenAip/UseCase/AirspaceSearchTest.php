<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\UseCase\AirspaceSearch;
use NavplanTest\OpenAip\Mocks\AirspaceSearchMock;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceSearchTest extends TestCase {
    private $repoMock;
    private $airspaceSearch;
    private $expectedResult;


    private function getAirspaceSearch(): AirspaceSearch {
        return $this->airspaceSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirspace1::create(), DummyAirspace1::create() ];
        $this->repoMock = new AirspaceSearchMock();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->airspaceSearch = new AirspaceSearch($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->airspaceSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getAirspaceSearch()->searchByExtent($extent, 11);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
