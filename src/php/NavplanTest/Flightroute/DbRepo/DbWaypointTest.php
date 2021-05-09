<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DbRepo;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\DbRepo\WaypointConverter;
use Navplan\Flightroute\Domain\Waypoint;
use NavplanTest\Flightroute\Mocks\DummyWaypoint1;
use NavplanTest\Flightroute\Mocks\DummyWaypoint2;
use NavplanTest\Flightroute\Mocks\DummyWaypoint3;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbWaypointTest extends TestCase {
    private MockDbService $dbService;


    private function assertEqualDbResult(array $dbResult, Waypoint $wp) {
        $this->assertEquals($dbResult["type"], $wp->type);
        $this->assertEquals($dbResult["freq"], $wp->frequency);
        $this->assertEquals($dbResult["callsign"], $wp->callsign);
        $this->assertEquals($dbResult["checkpoint"], $wp->checkpoint);
        $this->assertEquals($dbResult["alt"], $wp->altitude);
        $this->assertEquals($dbResult["isminalt"], $wp->isMinAlt);
        $this->assertEquals($dbResult["ismaxalt"], $wp->isMaxAlt);
        $this->assertEquals($dbResult["isaltatlegstart"], $wp->isAltAtLegStart);
        $this->assertEquals($dbResult["remark"], $wp->remark);
        $this->assertEquals($dbResult["supp_info"], $wp->suppInfo);
        $this->assertEquals($dbResult["latitude"], $wp->position->latitude);
        $this->assertEquals($dbResult["longitude"], $wp->position->longitude);
        $this->assertEquals($dbResult["airport_icao"], $wp->airportIcao);
        $this->assertEquals($dbResult["is_alternate"], $wp->isAlternate);
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
    }


    public function test_fromDbResult() {
        $dbResult1 = DummyWaypoint1::createDbResult();
        $dbResult2 = DummyWaypoint2::createDbResult();
        $dbResult3 = DummyWaypoint3::createDbResult();

        $wp1 = WaypointConverter::fromDbRow($dbResult1);
        $wp2 = WaypointConverter::fromDbRow($dbResult2);
        $wp3 = WaypointConverter::fromDbRow($dbResult3);

        $this->assertEqualDbResult($dbResult1, $wp1);
        $this->assertEqualDbResult($dbResult2, $wp2);
        $this->assertEqualDbResult($dbResult3, $wp3);
    }


    public function test_toInsertSql() {
        $wp1 = DummyWaypoint1::create();
        $wp2 = DummyWaypoint1::create();
        $wp3 = DummyWaypoint1::create();
        $flightrouteId = 12345;
        $sortOrder = 131;

        $sql1 = WaypointConverter::toInsertSql($this->dbService, $wp1, $flightrouteId, $sortOrder);
        $sql2 = WaypointConverter::toInsertSql($this->dbService, $wp2, $flightrouteId, $sortOrder);
        $sql3 = WaypointConverter::toInsertSql($this->dbService, $wp3, $flightrouteId, $sortOrder);

        $this->assertRegExp("/INSERT INTO/", $sql1);
        $this->assertRegExp("/" . $flightrouteId . "/", $sql1);
        $this->assertRegExp("/" . $sortOrder . "/", $sql1);

        $this->assertRegExp("/INSERT INTO/", $sql2);
        $this->assertRegExp("/" . $flightrouteId . "/", $sql2);
        $this->assertRegExp("/" . $sortOrder . "/", $sql2);

        $this->assertRegExp("/INSERT INTO/", $sql3);
        $this->assertRegExp("/" . $flightrouteId . "/", $sql3);
        $this->assertRegExp("/" . $sortOrder . "/", $sql3);
    }


    public function test_toInsertSql_escape_special_characters() {
        $wp = DummyWaypoint1::create();
        $wp->type = "xxx'type'xxx";
        $wp->frequency = "xxx'frequency'xxx";
        $wp->callsign = "xxx'callsign'xxx";
        $wp->checkpoint = "xxx'checkpoint'xxx";
        $wp->altitude = "xxx'altitude'xxx";
        $wp->remark = "xxx'remark'xxx";
        $wp->suppInfo = "xxx'suppInfo'xxx";
        $wp->airportIcao = "xxx'airportIcao'xxx";
        $flightrouteId = 12345;
        $sortOrder = 131;

        $sql = WaypointConverter::toInsertSql($this->dbService, $wp, $flightrouteId, $sortOrder);

        $this->assertRegExp("/xxx\\\\'type\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'frequency\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'callsign\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'checkpoint\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'altitude\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'remark\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'suppInfo\\\\'xxx/", $sql);
        $this->assertRegExp("/xxx\\\\'airportIcao\\\\'xxx/", $sql);
    }
}
