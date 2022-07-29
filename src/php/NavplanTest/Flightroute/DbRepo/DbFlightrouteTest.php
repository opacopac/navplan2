<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DbRepo;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Persistence\Repo\DbFlightrouteConverter;
use Navplan\User\DomainService\ITokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use NavplanTest\Flightroute\Mocks\DummyFlightroute3;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockDbService;
use NavplanTest\User\Mocks\DummyUser1;
use PHPUnit\Framework\TestCase;


class DbFlightrouteTest extends TestCase {
    private MockDbService $dbService;
    private ITokenService $tokenService;


    private function assertEqualDbResult(array $dbResult, Flightroute $flightroute) {
        $this->assertEquals($dbResult["id"], $flightroute->id);
        $this->assertEquals($dbResult["md5_hash"], $flightroute->hash);
        $this->assertEquals($dbResult["title"], $flightroute->title);
        $this->assertEquals($dbResult["aircraft_speed"], $flightroute->aircraftSpeed);
        $this->assertEquals($dbResult["aircraft_consumption"], $flightroute->aircraftConsumption);
        $this->assertEquals($dbResult["extra_fuel"], $flightroute->extraFuelL);
        $this->assertEquals($dbResult["comments"], $flightroute->comments);
    }


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->dbService = $config->dbService;
        $this->tokenService = $config->getTokenService();

    }


    public function test_fromDbResult() {
        $dbResult1 = DummyFlightroute1::createDbResult();
        $dbResult2 = DummyFlightroute2::createDbResult();
        $dbResult3 = DummyFlightroute3::createDbResult();

        $flightroute1 = DbFlightrouteConverter::fromDbRow($dbResult1);
        $flightroute2 = DbFlightrouteConverter::fromDbRow($dbResult2);
        $flightroute3 = DbFlightrouteConverter::fromDbRow($dbResult3);

        $this->assertEqualDbResult($dbResult1, $flightroute1);
        $this->assertEqualDbResult($dbResult2, $flightroute2);
        $this->assertEqualDbResult($dbResult3, $flightroute3);
    }


    public function test_toDeleteSql() {
        $flightrouteId = 11235813;

        $sql = DbFlightrouteConverter::toDeleteSql($flightrouteId);

        $this->assertRegExp("/DELETE FROM/", $sql);
        $this->assertRegExp("/" . $flightrouteId . "/", $sql);
    }


    public function test_toInsertSql() {
        $flightroute1 = DummyFlightroute1::create();
        $flightroute2 = DummyFlightroute2::create();
        $flightroute3 = DummyFlightroute3::create();
        $user = DummyUser1::create($this->tokenService);

        $sql1 = DbFlightrouteConverter::toInsertSql($this->dbService, $flightroute1, $user->id);
        $sql2 = DbFlightrouteConverter::toInsertSql($this->dbService, $flightroute2, $user->id);
        $sql3 = DbFlightrouteConverter::toInsertSql($this->dbService, $flightroute3, $user->id);

        $this->assertRegExp("/INSERT INTO/", $sql1);
        $this->assertRegExp("/" . $user->id . "/", $sql1);
        $this->assertRegExp("/INSERT INTO/", $sql2);
        $this->assertRegExp("/" . $user->id . "/", $sql2);
        $this->assertRegExp("/INSERT INTO/", $sql3);
        $this->assertRegExp("/" . $user->id . "/", $sql3);
    }


    public function test_toInsertSql_escape_special_chars() {
        $flightroute1 = DummyFlightroute1::create();
        $flightroute1->title = "xxx'title'xxx";
        $flightroute1->comments = "xxx'comments'xxx";
        $flightroute1->shareId = "xxx'shareid'xxx";
        $flightroute1->hash = "xxx'hash'xxx";
        $user = DummyUser1::create($this->tokenService);

        $sql = DbFlightrouteConverter::toInsertSql($this->dbService, $flightroute1, $user->id);

        $this->assertRegExp("/xxx\\\\'title\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'comments\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'shareid\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'hash\\\\'xxx/", $sql);
    }


    public function test_toUpdateSql() {
        $flightroute1 = DummyFlightroute1::create();
        $flightroute2 = DummyFlightroute2::create();
        $flightroute3 = DummyFlightroute3::create();

        $sql1 = DbFlightrouteConverter::toUpdateSql($this->dbService, $flightroute1);
        $sql2 = DbFlightrouteConverter::toUpdateSql($this->dbService, $flightroute2);
        $sql3 = DbFlightrouteConverter::toUpdateSql($this->dbService, $flightroute3);

        $this->assertRegExp("/UPDATE/", $sql1);
        $this->assertRegExp("/" . $flightroute1->id . "/", $sql1);
        $this->assertRegExp("/UPDATE/", $sql2);
        $this->assertRegExp("/" . $flightroute2->id . "/", $sql2);
        $this->assertRegExp("/UPDATE/", $sql3);
        $this->assertRegExp("/" . $flightroute3->id . "/", $sql3);
    }


    public function test_toUpdateSql_escape_special_chars() {
        $flightroute = DummyFlightroute1::create();
        $flightroute->title = "xxx'title'xxx";
        $flightroute->comments = "xxx'comments'xxx";
        $flightroute->shareId = "xxx'shareid'xxx";
        $flightroute->hash = "xxx'hash'xxx";

        $sql = DbFlightrouteConverter::toUpdateSql($this->dbService, $flightroute);

        $this->assertRegExp("/xxx\\\\'title\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'comments\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'shareid\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'hash\\\\'xxx/", $sql);
    }
}
