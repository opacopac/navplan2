<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\UseCase\AirportSearch;
use NavplanTest\OpenAip\Mocks\AirportRepoMock;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportSearchTest extends TestCase {
    private $repoMock;
    private $airportSearch;
    private $expectedResult;


    private function getAirportSearch(): AirportSearch {
        return $this->airportSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirport1::create(), DummyAirport1::create() ];
        $this->repoMock = new AirportRepoMock();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->airportSearch = new AirportSearch($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->airportSearch);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->getAirportSearch()->searchByExtent($extent, 11);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText() {
        $result = $this->getAirportSearch()->searchByText("FRI", 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->getAirportSearch()->searchByPosition($pos, 0.5, 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
