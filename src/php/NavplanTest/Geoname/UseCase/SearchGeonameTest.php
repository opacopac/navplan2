<?php declare(strict_types=1);

namespace NavplanTest\Geoname\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\UseCase\SearchGeoname;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use PHPUnit\Framework\TestCase;


class SearchGeonameTest extends TestCase {
    private $repoMock;
    private $geonameSearch;
    private $expectedResult;


    private function getGeonameSearch(): SearchGeoname {
        return $this->geonameSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = [ DummyGeoname1::create(), DummyGeoname1::create() ];
        $this->repoMock = new MockGeonameRepo();
        $this->repoMock->pushMockResult($this->expectedResult);
        $this->geonameSearch = new SearchGeoname($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->geonameSearch);
    }


    public function test_searchByText() {
        $result = $this->getGeonameSearch()->searchByText("Bern", 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->getGeonameSearch()->searchByPosition($pos, 0.5, 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
