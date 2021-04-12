<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\UseCase\SearchAirport\SearchAirportUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class SearchAirportUcTest extends TestCase {
    private SearchAirportUc $searchAirportUc;
    private array $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirport1::create(), DummyAirport1::create() ];
        $config = new MockNavplanDiContainer();
        $airportRepo = $config->airportRepo;
        $airportRepo->pushMockResult($this->expectedResult);
        $this->searchAirportUc = $config->getSearchAirportUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchAirportUc);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->searchAirportUc->searchByExtent($extent, 11);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText() {
        $result = $this->searchAirportUc->searchByText("FRI", 10);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->searchAirportUc->searchByPosition($pos, 0.5, 10);
        $this->assertSameSize($this->expectedResult, $result);
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByIcao() {
        $result = $this->searchAirportUc->searchByIcao(["LSZB", "LSGE"]);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
