<?php declare(strict_types=1);

namespace NavplanTest\User\DbRepo;

use Navplan\User\DbRepo\UserDbRepoFactory;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class UserDbRepoFactoryTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
    }


    public function test_create_instance() {
        $factory = new UserDbRepoFactory($this->getDbService());
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createUserPointRepo());
    }
}
