<?php declare(strict_types=1);

namespace NavplanTest\User\DbRepo;

use Navplan\User\DbRepo\DbUserRepoFactory;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class DbUserRepoFactoryTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
    }


    public function test_create_instance() {
        $factory = new DbUserRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createUserPointSearch());
    }
}
