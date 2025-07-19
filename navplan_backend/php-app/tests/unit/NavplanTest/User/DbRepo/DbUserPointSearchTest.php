<?php declare(strict_types=1);

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\User\Domain\Model\UserPoint;
use Navplan\User\Persistence\Service\DbUserPointRepo;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class DbUserPointSearchTest extends TestCase {
    private MockDbService $dbService;
    private DbUserPointRepo $dbRepo;


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
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbUserPointRepo($this->dbService);
    }


    public function test__construct() {
        $this->assertNotNull($this->dbRepo);
    }


    public function test_searchByExtent() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1, $upDbResult2]);
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $upResultList = $this->dbRepo->searchByExtent($extent, "asdf@asdf.com");

        $this->assertCount(2, $upResultList);
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByExtent_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1]);
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $this->dbRepo->searchByExtent($extent, "asdf@asdf.c'om");

        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->dbService->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->dbService->getAllQueriesString());
    }


    public function test_searchByPosition() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1, $upDbResult2]);
        $pos = new Position2d(7.0, 47.0);

        $upResultList = $this->dbRepo->searchByPosition($pos, 0.5, 20, "asdf@asdf.com");

        $this->assertCount(2, $upResultList);
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByPosition_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1]);
        $pos = new Position2d(7.0, 47.0);

        $this->dbRepo->searchByPosition($pos, 0.5, 20, "asdf@asdf.c'om");

        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->dbService->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->dbService->getAllQueriesString());
    }


    public function test_searchByText() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $upDbResult2 = DummyUserPoint2::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1, $upDbResult2]);

        $upResultList = $this->dbRepo->searchByText("FRI", 20, "asdf@asdf.com");

        $this->assertCount(2, $upResultList);
        $this->assertEqualUserPoint($upDbResult1, $upResultList[0]);
        $this->assertEqualUserPoint($upDbResult2, $upResultList[1]);
    }


    public function test_searchByText_escape_character() {
        $upDbResult1 = DummyUserPoint1::createDbResult();
        $this->dbService->pushMockResult([$upDbResult1]);

        $this->dbRepo->searchByText("F'R;I", 20, "asdf@asdf.c'om");

        $this->assertRegExp("/F\\\\'R;I/", $this->dbService->getAllQueriesString());
        $this->assertNotRegExp("/F'R;I/", $this->dbService->getAllQueriesString());
        $this->assertRegExp("/asdf@asdf\.c\\\\'om/", $this->dbService->getAllQueriesString());
        $this->assertNotRegExp("/asdf@asdf\.c'om/", $this->dbService->getAllQueriesString());
    }
}
