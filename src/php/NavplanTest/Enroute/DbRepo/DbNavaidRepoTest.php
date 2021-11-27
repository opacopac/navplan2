<?php declare(strict_types=1);

namespace NavplanTest\Enroute\DbRepo;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\DbService\DbNavaidRepo;
use NavplanTest\Enroute\Mocks\DummyNavaid1;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbNavaidRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbNavaidRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbNavaidRepo {
        return $this->dbRepo;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbNavaidRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $navaidDbResult = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $navaidResultList = $this->getDbRepo()->searchByExtent($extent, 11);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEquals(DummyNavaid1::create(), $navaidResultList[0]);
    }


    public function test_searchByPosition() {
        $navaidDbResult1 = DummyNavaid1::createDbResult();
        $navaidDbResult2 = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult1, $navaidDbResult2]);
        $pos = new Position2d(7.0, 47.0);
        $navaidResultList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEquals(DummyNavaid1::create(), $navaidResultList[0]);
        $this->assertEquals(DummyNavaid1::create(), $navaidResultList[1]);
    }


    public function test_searchByText() {
        $navaidDbResult = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $navaidResultList = $this->getDbRepo()->searchByText("FRI", 20);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEquals(DummyNavaid1::create(), $navaidResultList[0]);
    }


    public function test_searchByText_escape_character() {
        $navaidDbResult = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $this->getDbRepo()->searchByText("FR'I", 20);

        $this->assertRegExp("/FR\\\\'I/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/FR'I/", $this->getDbService()->getAllQueriesString());
    }
}
