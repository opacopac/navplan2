<?php declare(strict_types=1);

namespace NavplanTest\Notam\DbRepo;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Persistence\Service\DbNotamRepo;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbNotamSearchTest extends TestCase {
    private MockDbService $dbService;
    private DbNotamRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbNotamRepo {
        return $this->dbRepo;
    }


    private function assertEqualNotam(array $dbNotam, Notam $notam) {
        $this->assertEquals($dbNotam['id'], $notam->id);
        /*$this->assertEquals($dbNotam['notamid'], $notam->notamId);
        $this->assertEquals($dbNotam['country'], $notam->stateCode);
        $this->assertEquals($dbNotam['type'], $notam->type);
        $this->assertEquals($dbNotam['icao'], $notam->location);
        $this->assertEquals($dbNotam['startdate'], $notam->startdate);
        $this->assertEquals($dbNotam['enddate'], $notam->enddate);*/
        // TODO: geometry, detail fields in JSON
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbNotamRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $dbResult1 = DummyNotam1::createDbResult();
        $dbResult2 = DummyNotam2::createDbResult();
        $dbResult3 = DummyNotam3::createDbResult();
        $this->getDbService()->pushMockResult([array("icao" => "LSZB"), array("icao" => "LSZG")]);
        $this->getDbService()->pushMockResult([$dbResult1, $dbResult2, $dbResult3]);
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $resultList = $this->getDbRepo()->searchByExtent($extent, 11, 1558888535, 1559888535);

        $this->assertEquals(1, count($resultList)); // reason: non-area notams are filtered
        $this->assertEqualNotam($dbResult3, $resultList[0]);
    }


    public function test_searchByPosition() {
        $dbResult1 = DummyNotam1::createDbResult();
        $dbResult2 = DummyNotam2::createDbResult();
        $this->getDbService()->pushMockResult([$dbResult1, $dbResult2]);
        $pos = new Position2d(7.0, 47.0);
        $navaidResultList = $this->getDbRepo()->searchByPosition($pos, 1558888535, 1559888535, 20);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualNotam($dbResult1, $navaidResultList[0]);
        $this->assertEqualNotam($dbResult2, $navaidResultList[1]);
    }


    public function test_searchByIcao() {
        $dbResult1 = DummyNotam1::createDbResult();
        $dbResult2 = DummyNotam2::createDbResult();
        $this->getDbService()->pushMockResult([$dbResult1, $dbResult2]);
        $navaidResultList = $this->getDbRepo()->searchByIcao(["LSAS", "LSZB"], 1558888535, 1559888535);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualNotam($dbResult1, $navaidResultList[0]);
        $this->assertEqualNotam($dbResult2, $navaidResultList[1]);
    }
}
