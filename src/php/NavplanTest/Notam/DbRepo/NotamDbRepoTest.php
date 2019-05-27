<?php declare(strict_types=1);

namespace NavplanTest\Notam\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Notam\DbRepo\NotamDbRepo;
use Navplan\Notam\Domain\Notam;
use NavplanTest\DbServiceMock;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use PHPUnit\Framework\TestCase;


class NotamDbRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): NotamDbRepo {
        return $this->dbRepo;
    }


    private function assertEqualNotam(array $dbNotam, Notam $notam) {
        $this->assertEquals($dbNotam['id'], $notam->id);
        // TODO
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new NotamDbRepo($this->getDbService());
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
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
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
