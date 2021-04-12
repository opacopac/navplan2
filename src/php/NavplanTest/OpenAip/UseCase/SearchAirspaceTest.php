<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\UseCase\SearchAirspace\SearchAirspaceUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class SearchAirspaceTest extends TestCase {
    private SearchAirspaceUc $airspaceSearchUc;
    private array $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirspace1::create(), DummyAirspace1::create() ];
        $config = new MockNavplanDiContainer();
        $config->airspaceRepo->pushMockResult($this->expectedResult);
        $this->airspaceSearchUc = $config->getSearchAirspaceUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->airspaceSearchUc);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->airspaceSearchUc->searchByExtent($extent, 11);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
