<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use NavplanTest\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbOpenAipRepoFactoryTest extends TestCase {
    private MockDbService $dbService;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
    }


    public function test_create_instance() {
        $factory = new DbOpenAipRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createAirportRepo());
        $this->assertNotNull($factory->createNavaidRepo());
        $this->assertNotNull($factory->createAirspaceRepo());
        $this->assertNotNull($factory->createReportingPointRepo());
        $this->assertNotNull($factory->createWebcamRepo());
    }
}
