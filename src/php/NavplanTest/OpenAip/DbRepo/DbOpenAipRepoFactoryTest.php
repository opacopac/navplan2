<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class DbOpenAipRepoFactoryTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
    }


    public function test_create_instance() {
        $factory = new DbOpenAipRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createAirportSearch());
        $this->assertNotNull($factory->createNavaidSearch());
        $this->assertNotNull($factory->createAirspaceSearch());
        $this->assertNotNull($factory->createReportingPointSearch());
        $this->assertNotNull($factory->createWebcamSearch());
    }
}
