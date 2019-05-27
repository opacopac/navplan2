<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\DbRepo\AirspaceDbRepo;
use Navplan\OpenAip\Domain\Airspace;
use Navplan\Geometry\Domain\Ring2d;
use NavplanTest\DbServiceMock;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceDbRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): AirspaceDbRepo {
        return $this->dbRepo;
    }


    private function assertEqualAirspace(array $asDb, Airspace $as) {
        $this->assertEquals($asDb['id'], $as->id);
        $this->assertEquals($asDb['aip_id'], $as->aip_id);
        $this->assertEquals($asDb['category'], $as->category);
        $this->assertEquals($asDb['country'], $as->country);
        $this->assertEquals($asDb['name'], $as->name);
        $this->assertEquals($asDb['alt_bottom_reference'], $as->alt_bottom->reference);
        $this->assertEquals($asDb['alt_bottom_height'], $as->alt_bottom->height);
        $this->assertEquals($asDb['alt_bottom_unit'], $as->alt_bottom->unit);
        $this->assertEquals($asDb['alt_top_reference'], $as->alt_top->reference);
        $this->assertEquals($asDb['alt_top_height'], $as->alt_top->height);
        $this->assertEquals($asDb['alt_top_unit'], $as->alt_top->unit);
        $this->assertEquals(Ring2d::createFromString($asDb['polygon']), $as->polygon);
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new AirspaceDbRepo($this->getDbService());
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
        $this->assertEqualAirspace($asDb, $asList[0]);
    }
}
