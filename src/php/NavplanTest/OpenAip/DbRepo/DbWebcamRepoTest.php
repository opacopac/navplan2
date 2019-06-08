<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\DbRepo\DbWebcamRepo;
use Navplan\OpenAip\Domain\Webcam;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class DbWebcamRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbWebcamRepo {
        return $this->dbRepo;
    }


    private function assertEqualNavaid(array $camDbResult, Webcam $cam) {
        $this->assertEquals($camDbResult['name'], $cam->name);
        $this->assertEquals($camDbResult['url'], $cam->url);
        $this->assertEquals($camDbResult['latitude'], $cam->position ? $cam->position->latitude : NULL);
        $this->assertEquals($camDbResult['longitude'], $cam->position ? $cam->position->longitude : NULL);
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
        $this->assertEqualNavaid($camDbResult1, $navaidResultList[0]);
        $this->assertEqualNavaid($camDbResult2, $navaidResultList[1]);
    }
}
