<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\DbRepo\OpenAipDbRepoFactory;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class OpenAipDbRepoFactoryTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
    }


    public function test_create_instance() {
        $factory = new OpenAipDbRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createAirportRepo());
        $this->assertNotNull($factory->createNavaidRepo());
        $this->assertNotNull($factory->createAirspaceRepo());
        $this->assertNotNull($factory->createReportingPointRepo());
        $this->assertNotNull($factory->createWebcamRepo());
    }
}
