<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\DbRepo\DbAirspaceRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class DbAirspaceRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbAirspaceRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbAirspaceRepo {
        return $this->dbRepo;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbAirspaceRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $asDb = DummyAirspace1::createDbResult();
        $this->getDbService()->pushMockResult([$asDb]);
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $asList = $this->getDbRepo()->searchByExtent($extent, 11);

        $this->assertEquals(1, count($asList));
        $this->assertEquals(DummyAirspace1::create(), $asList[0]);
    }
}
