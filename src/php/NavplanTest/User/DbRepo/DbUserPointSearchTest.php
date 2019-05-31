<?php declare(strict_types=1);

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\User\DbRepo\DbUserPointRepo;
use Navplan\User\Domain\UserPoint;
use NavplanTest\Db\Mock\DbServiceMock;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class DbUserPointSearchTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): DbUserPointRepo {
        return $this->dbRepo;
    }


    private function assertEqualUserPoint(array $upDbResult, UserPoint $up) {
        $this->assertEquals($upDbResult['id'], $up->id);
        $this->assertEquals($upDbResult['type'], $up->type);
        $this->assertEquals($upDbResult['name'], $up->name);
        $this->assertEquals($upDbResult['latitude'], $up->position->latitude);
        $this->assertEquals($upDbResult['longitude'], $up->position->longitude);
        $this->assertEquals($upDbResult['remark'], $up->remark);
        $this->assertEquals($upDbResult['supp_info'], $up->supp_info);
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new DbUserPointRepo($this->getDbService());
    }


    public function test__construct() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1, $upDbResult2]);
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $upResultList = $this->getDbRepo()->searchByExtent($extent, "asdf@asdf.com");

        $this->assertEquals(2, count($upResultList));
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByExtent_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1]);
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $this->getDbRepo()->searchByExtent($extent, "asdf@asdf.c'om");

        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->getDbService()->getAllQueriesString());
    }


    public function test_searchByPosition() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1, $upDbResult2]);
        $pos = new Position2d(7.0, 47.0);
        $upResultList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20, "asdf@asdf.com");

        $this->assertEquals(2, count($upResultList));
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByPosition_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1]);
        $pos = new Position2d(7.0, 47.0);
        $this->getDbRepo()->searchByPosition($pos, 0.5, 20, "asdf@asdf.c'om");

        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->getDbService()->getAllQueriesString());
    }


    public function test_searchByText() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1, $upDbResult2]);
        $upResultList = $this->getDbRepo()->searchByText("FRI", 20, "asdf@asdf.com");

        $this->assertEquals(2, count($upResultList));
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByText_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$upDbResult1]);
        $this->getDbRepo()->searchByText("F'R;I", 20, "asdf@asdf.c'om");

        $this->assertRegExp("/F\\\\'R;I/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/F'R;I/", $this->getDbService()->getAllQueriesString());
        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->getDbService()->getAllQueriesString());
    }
}
