<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\DbRepo;

use Navplan\Aerodrome\Persistence\Repo\DbAirportRepo;
use Navplan\Common\DomainModel\Position2d;
use NavplanTest\Aerodrome\Mocks\DummyAirport1;
use NavplanTest\Aerodrome\Mocks\DummyAirportFeature1;
use NavplanTest\Aerodrome\Mocks\DummyAirportRadio1;
use NavplanTest\Aerodrome\Mocks\DummyAirportRadio2;
use NavplanTest\Aerodrome\Mocks\DummyAirportRunway1;
use NavplanTest\Aerodrome\Mocks\DummyAirportRunway2;
use NavplanTest\System\Mock\MockDbService;
use NavplanTest\Webcam\Mocks\DummyWebcam1;
use PHPUnit\Framework\TestCase;


class DbAirportRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbAirportRepo $dbRepo;


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
        $this->getDbService()->pushMockResult([DummyAirportFeature1::createDbResult()]);
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbAirportRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
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
