<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\UseCase\SearchAirspace;
use NavplanTest\OpenAip\Mocks\MockAirspaceRepo;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\MockOpenAipConfig;
use PHPUnit\Framework\TestCase;


class SearchAirspaceTest extends TestCase {
    /* @var $airspaceRepo MockAirspaceRepo */
    private $airspaceRepo;
    private $airspaceSearch;
    private $expectedResult;


    private function getAirspaceSearch(): SearchAirspace {
        return $this->airspaceSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyAirspace1::create(), DummyAirspace1::create() ];
        $config = new MockOpenAipConfig();
        $this->airspaceRepo = $config->getOpenAipRepoFactory()->createAirspaceRepo();
        $this->airspaceRepo->pushMockResult($this->expectedResult);
        $this->airspaceSearch = new SearchAirspace($config);
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
