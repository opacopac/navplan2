<?php declare(strict_types=1);

namespace NavplanTest\User\DbRepo;

use Navplan\User\Persistence\Service\DbUserRepoFactory;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbUserRepoFactoryTest extends TestCase {
    private MockDbService $dbService;


    protected function setUp(): void {
        $this->dbService = new MockDbService();
    }


    public function test_create_instance() {
        $factory = new DbUserRepoFactory($this->dbService);
        $this->assertNotNull($factory);
        $this->assertNotNull($factory->createUserPointRepo());
    }
}
