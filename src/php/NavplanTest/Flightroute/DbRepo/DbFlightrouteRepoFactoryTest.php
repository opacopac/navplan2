<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DbRepo;

use Navplan\Flightroute\DbRepo\DbFlightrouteRepoFactory;
use NavplanTest\Db\Mock\DbServiceMock;
use PHPUnit\Framework\TestCase;


class DbFlightrouteRepoFactoryTest extends TestCase {
    /* @var $dbService DbServiceMock */
    private $dbService;
    /* @var $dbFlightrouteRepoFactory DbFlightrouteRepoFactory */
    private $dbFlightrouteRepoFactory;


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbFlightrouteRepoFactory = new DbFlightrouteRepoFactory($this->dbService);
    }


    public function test__construct() {
        $this->assertNotNull($this->dbFlightrouteRepoFactory);
    }



    public function test_createFlightrouteRepo() {
        $repo = $this->dbFlightrouteRepoFactory->createFlightrouteRepo();

        $this->assertNotNull($repo);
    }
}
