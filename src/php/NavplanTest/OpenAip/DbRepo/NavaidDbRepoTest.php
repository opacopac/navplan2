<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\DbRepo\NavaidDbRepo;
use NavplanTest\DbServiceMock;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidDbRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): NavaidDbRepo {
        return $this->dbRepo;
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
        $this->dbRepo = new NavaidDbRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $navaidDbResult = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $navaidResultList = $this->getDbRepo()->searchByExtent(7.0, 47.0, 7.9, 47.9, 11);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult, $navaidResultList[0]);
    }


    public function test_searchByPosition() {
        $navaidDbResult1 = DummyNavaid1::createDbResult();
        $navaidDbResult2 = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult1, $navaidDbResult2]);
        $navaidResultList = $this->getDbRepo()->searchByPosition(7.0, 47.0, 0.5, 20);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult2, $navaidResultList[1]);
    }


    public function test_searchByText() {
        $navaidDbResult = DummyNavaid1::createDbResult();
        $this->getDbService()->pushMockResult([$navaidDbResult]);
        $navaidResultList = $this->getDbRepo()->searchByText("FRI", 20);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEqualNavaid($navaidDbResult, $navaidResultList[0]);
    }
}
