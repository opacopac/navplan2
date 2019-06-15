<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\DbRepo\DbAirportRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyAirportRadio1;
use NavplanTest\OpenAip\Mocks\DummyAirportRadio2;
use NavplanTest\OpenAip\Mocks\DummyAirportRunway1;
use NavplanTest\OpenAip\Mocks\DummyAirportRunway2;
use NavplanTest\OpenAip\Mocks\DummyMapFeature1;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use PHPUnit\Framework\TestCase;


class DbAirportRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbAirportRepo {
        return $this->dbRepo;
    }


    private function prepareAirport1DbResult() {
        $this->getDbService()->pushMockResult([DummyAirport1::createDbResult()]);
        $this->getDbService()->pushMockResult([DummyAirportRunway1::createDbResult(), DummyAirportRunway2::createDbResult()]);
        $this->getDbService()->pushMockResult([DummyAirportRadio1::createDbResult(), DummyAirportRadio2::createDbResult()]);
        $this->getDbService()->pushMockResult([DummyWebcam1::createDbResult()]);
        $this->getDbService()->pushMockResult([DummyMapFeature1::createDbResult()]);
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbAirportRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $this->prepareAirport1DbResult();
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $adList = $this->getDbRepo()->searchByExtent($extent, 11);

        $this->assertEquals(1, count($adList));
        $this->assertEquals(DummyAirport1::create(), $adList[0]);
    }


    public function test_searchByPosition() {
        $this->prepareAirport1DbResult();
        $pos = new Position2d(7.0, 47.0);

        $adList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20);

        $this->assertEquals(1, count($adList));
        $this->assertEquals(DummyAirport1::create(), $adList[0]);
    }


    public function test_searchByText() {
        $this->prepareAirport1DbResult();
        $adList = $this->getDbRepo()->searchByText("LSZB", 20);

        $this->assertEquals(1, count($adList));
        $this->assertEquals(DummyAirport1::create(), $adList[0]);
    }


    public function test_searchByText_escape_character() {
        $this->prepareAirport1DbResult();
        $this->getDbRepo()->searchByText("L'ZB", 20);

        $this->assertRegExp("/L\\\\'ZB/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/L'ZB/", $this->getDbService()->getAllQueriesString());
    }
}
