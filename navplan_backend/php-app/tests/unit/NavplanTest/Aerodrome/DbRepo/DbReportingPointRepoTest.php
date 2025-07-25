<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\DbRepo;

use Navplan\AerodromeReporting\Persistence\Repo\DbReportingPointRepo;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use NavplanTest\Aerodrome\Mocks\DummyReportingPoint1;
use NavplanTest\Aerodrome\Mocks\DummyReportingSector1;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbReportingPointRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbReportingPointRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbReportingPointRepo {
        return $this->dbRepo;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbReportingPointRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $repPointDbResult2 = DummyReportingSector1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1, $repPointDbResult2]);
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $repPointResultList = $this->getDbRepo()->searchByExtent($extent);

        $this->assertEquals(2, count($repPointResultList));
        $this->assertEquals(DummyReportingPoint1::create(), $repPointResultList[0]);
        $this->assertEquals(DummyReportingSector1::create(), $repPointResultList[1]);
    }


    public function test_searchByPosition() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1]);
        $pos = new Position2d(7.0, 47.0);

        $repPointResultList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20);

        $this->assertEquals(1, count($repPointResultList));
        $this->assertEquals(DummyReportingPoint1::create(), $repPointResultList[0]);
    }


    public function test_searchByText() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $repPointDbResult2 = DummyReportingSector1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1, $repPointDbResult2]);

        $repPointResultList = $this->getDbRepo()->searchByText("LS", 20);

        $this->assertEquals(2, count($repPointResultList));
        $this->assertEquals(DummyReportingPoint1::create(), $repPointResultList[0]);
        $this->assertEquals(DummyReportingSector1::create(), $repPointResultList[1]);
    }


    public function test_searchByText_escape_character() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1]);

        $this->getDbRepo()->searchByText("LS'Z", 20);

        $this->assertRegExp("/LS\\\\'Z/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/LS'Z/", $this->getDbService()->getAllQueriesString());
    }
}
