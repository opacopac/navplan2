<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\DbRepo\WebcamDbRepo;
use Navplan\OpenAip\Domain\Webcam;
use NavplanTest\DbServiceMock;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class WebcamDbRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): WebcamDbRepo {
        return $this->dbRepo;
    }


    private function assertEqualNavaid(array $camDbResult, Webcam $cam) {
        $this->assertEquals($camDbResult['name'], $cam->name);
        $this->assertEquals($camDbResult['url'], $cam->url);
        $this->assertEquals($camDbResult['latitude'], $cam->position ? $cam->position->latitude : NULL);
        $this->assertEquals($camDbResult['longitude'], $cam->position ? $cam->position->longitude : NULL);
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new WebcamDbRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $camDbResult1 = DummyWebcam1::createDbResult();
        $camDbResult2 = DummyWebcam2::createDbResult();
        $this->getDbService()->pushMockResult([$camDbResult1, $camDbResult2]);
        $navaidResultList = $this->getDbRepo()->searchByExtent(7.0, 47.0, 7.9, 47.9);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualNavaid($camDbResult1, $navaidResultList[0]);
        $this->assertEqualNavaid($camDbResult2, $navaidResultList[1]);
    }
}
