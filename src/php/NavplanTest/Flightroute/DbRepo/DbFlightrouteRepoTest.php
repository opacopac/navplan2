<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DbRepo;

use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyWaypoint1;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\DummyUser1;
use PHPUnit\Framework\TestCase;


class DbFlightrouteRepoTest extends TestCase {
    /* @var $dbService MockDbService */
    private $dbService;
    /* @var $dbFlightrouteRepo DbFlightrouteRepo */
    private $dbFlightrouteRepo;
    /* @var $tokenService TokenService */
    private $tokenService;

    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->dbService = $config->getDbService();
        $this->dbFlightrouteRepo = new DbFlightrouteRepo($this->dbService);
        $this->tokenService = $config->getTokenService();
    }


    public function test__construct() {
        $this->assertNotNull($this->dbFlightrouteRepo);
    }



    public function test_add() {
        $route = DummyFlightroute1::create();
        $user = DummyUser1::create($this->tokenService);
        $numQueriesExpected = 1 + count($route->waypoinList) + ($route->alternate ? 1 : 0);

        $routeResult = $this->dbFlightrouteRepo->add($route, $user);

        $this->assertEquals($route, $routeResult);
        $this->assertEquals($this->dbService->insertId, $routeResult->id);
        $this->assertRegExp('/INSERT INTO/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_add_shared() {
        $route = DummyFlightroute1::create();
        $numQueriesExpected = 1 + count($route->waypoinList) + ($route->alternate ? 1 : 0);

        $routeResult = $this->dbFlightrouteRepo->add($route, NULL);

        $this->assertEquals($route, $routeResult);
        $this->assertEquals($this->dbService->insertId, $routeResult->id);
        $this->assertRegExp('/INSERT INTO/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_delete() {
        $routeId = 123234;
        $user = DummyUser1::create($this->tokenService);
        $numQueriesExpected = 2;

        $this->dbFlightrouteRepo->delete($routeId, $user);

        $this->assertRegExp('/DELETE FROM/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $routeId . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_update() {
        $route = DummyFlightroute1::create();
        $user = DummyUser1::create($this->tokenService);
        $numQueriesExpected = 1 + 1 + count($route->waypoinList) + ($route->alternate ? 1 : 0);

        $routeResult = $this->dbFlightrouteRepo->update($route, $user);

        $this->assertEquals($route, $routeResult);
        $this->assertRegExp('/UPDATE/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/DELETE FROM/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/INSERT INTO/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $route->id . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_read() {
        $routeId = 123234;
        $user = DummyUser1::create($this->tokenService);
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);
        $numQueriesExpected = 2;

        $this->dbFlightrouteRepo->read($routeId, $user);

        $this->assertRegExp('/SELECT/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $routeId . '/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $user->id . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_readByShareId() {
        $shareId = "123abc234";
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);
        $numQueriesExpected = 2;

        $this->dbFlightrouteRepo->readByShareId($shareId);

        $this->assertRegExp('/SELECT/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $shareId . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_readByShareId_escape_special_characters() {
        $shareId = "xxx'shareid'xxx";
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);

        $this->dbFlightrouteRepo->readByShareId($shareId);

        $this->assertRegExp("/xxx\\\\'shareid\\\\'xxx/", $this->dbService->getAllQueriesString());
    }


    public function test_readByHash() {
        $hash = "1x23abc2y34";
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);
        $numQueriesExpected = 2;

        $this->dbFlightrouteRepo->readByHash($hash);

        $this->assertRegExp('/SELECT/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $hash . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }


    public function test_readByHash_escape_special_characters() {
        $hash = "xxx'hash'xxx";
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);

        $this->dbFlightrouteRepo->readByHash($hash);

        $this->assertRegExp("/xxx\\\\'hash\\\\'xxx/", $this->dbService->getAllQueriesString());
    }


    public function test_readList() {
        $user = DummyUser1::create($this->tokenService);
        $dbResultRoute = DummyFlightroute1::createDbResult();
        $dbResultWp = DummyWaypoint1::createDbResult();
        $this->dbService->pushMockResult([$dbResultRoute]);
        $this->dbService->pushMockResult([$dbResultWp]);
        $numQueriesExpected = 1;

        $this->dbFlightrouteRepo->readList($user);

        $this->assertRegExp('/SELECT/', $this->dbService->getAllQueriesString());
        $this->assertRegExp('/' . $user->id . '/', $this->dbService->getAllQueriesString());
        $this->assertEquals($numQueriesExpected, count($this->dbService->queryList));
    }
}
