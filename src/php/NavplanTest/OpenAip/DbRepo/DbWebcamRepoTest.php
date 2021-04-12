<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\DbRepo\DbWebcamRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class DbWebcamRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbWebcamRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbWebcamRepo {
        return $this->dbRepo;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbWebcamRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $camDbResult1 = DummyWebcam1::createDbResult();
        $camDbResult2 = DummyWebcam2::createDbResult();
        $this->getDbService()->pushMockResult([$camDbResult1, $camDbResult2]);
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $navaidResultList = $this->getDbRepo()->searchByExtent($extent);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEquals(DummyWebcam1::create(), $navaidResultList[0]);
        $this->assertEquals(DummyWebcam2::create(), $navaidResultList[1]);
    }
}
