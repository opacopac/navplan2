<?php declare(strict_types=1);

namespace NavplanTest\User\DbRepo;

use Navplan\User\DbRepo\DbUserRepoFactory;
use NavplanTest\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbUserRepoFactoryTest extends TestCase {
    private $dbService;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
    }


    public function test_create_instance() {
        $factory = new DbUserRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createUserPointRepo());
    }
}
