<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\UseCase\SearchAirport;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\MockOpenAipConfig;
use PHPUnit\Framework\TestCase;


class SearchAirportTest extends TestCase {
    /* @var $airportRepo MockAirportRepo */
    private $airportRepo;
    private $searchAirport;
    private $expectedResult;


    private function getAirportSearch(): SearchAirport {
        return $this->searchAirport;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirport1::create(), DummyAirport1::create() ];
        $config = new MockOpenAipConfig();
        $this->airportRepo = $config->getOpenAipRepoFactory()->createAirportRepo();
        $this->airportRepo->pushMockResult($this->expectedResult);
        $this->searchAirport = new SearchAirport($config);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchAirport);
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


    public function test_searchByIcao() {
        $result = $this->getAirportSearch()->searchByIcao(["LSZB", "LSGE"]);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
