<?php declare(strict_types=1);

namespace NavplanTest\OpenAipDbRepoTest;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAipDbRepo\NavaidDbRepo;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class NavaidDbRepoTest extends TestCase {
    private $dbService;
    private $navaidRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getNavaidRepo(): NavaidDbRepo {
        return $this->navaidRepo;
    }


    private function createDummyNavaidResult(): array {
        return array(
            "id" => 1218,
            "type" => "VOR-DME",
            "kuerzel" => "FRI",
            "name" => "FRIBOURG",
            "latitude" => 46.7775,
            "longitude" => 7.22361,
            "elevation" => 799,
            "frequency" => "110.85",
            "unit" => "MHz",
            "declination" => 1.34846,
            "truenorth" => false
        );
    }


    private function assertEqualNavaid(array $navaidDbResult, Navaid $navaid) {
        $this->assertEquals($navaidDbResult['id'], $navaid->id);
        $this->assertEquals($navaidDbResult['type'], $navaid->type);
        $this->assertEquals($navaidDbResult['kuerzel'], $navaid->kuerzel);
        $this->assertEquals($navaidDbResult['name'], $navaid->name);
        $this->assertEquals($navaidDbResult['latitude'], $navaid->latitude);
        $this->assertEquals($navaidDbResult['longitude'], $navaid->longitude);
        $this->assertEquals($navaidDbResult['elevation'], $navaid->elevation);
        $this->assertEquals($navaidDbResult['frequency'], $navaid->frequency);
        $this->assertEquals($navaidDbResult['unit'], $navaid->unit);
        $this->assertEquals($navaidDbResult['declination'], $navaid->declination);
        $this->assertEquals($navaidDbResult['truenorth'], $navaid->truenorth);
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->navaidRepo = new NavaidDbRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getNavaidRepo());
    }


    public function test_searchByExtent() {
        $navaidDbResult = $this->createDummyNavaidResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $navaidResultList = $this->getNavaidRepo()->searchByExtent(7.0, 47.0, 7.9, 47.9, 11);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult, $navaidResultList[0]);
    }


    public function test_searchByPosition() {
        $navaidDbResult1 = $this->createDummyNavaidResult();
        $navaidDbResult2 = $this->createDummyNavaidResult();
        $this->getDbService()->pushMockResult([$navaidDbResult1, $navaidDbResult2]);
        $navaidResultList = $this->getNavaidRepo()->searchByPosition(7.0, 47.0, 0.5, 20);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult2, $navaidResultList[1]);
    }


    public function test_searchByText() {
        $navaidDbResult = $this->createDummyNavaidResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $navaidResultList = $this->getNavaidRepo()->searchByText("FRI", 20);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult, $navaidResultList[0]);
    }
}
