<?php declare(strict_types=1);

namespace NavplanTest\Traffic\TrafficDetailRepo;

use Navplan\Traffic\TrafficDetailRepo\DbTrafficDetailRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail3;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail4;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use PHPUnit\Framework\TestCase;


class DbTrafficRepoTest extends TestCase {
    /* @var $dbService MockDbService */
    private $dbService;
    /* @var $trafficRepo DbTrafficDetailRepo */
    private $trafficRepo;


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->trafficRepo = new DbTrafficDetailRepo($this->dbService);
    }


    public function test_readDetailsFromLfrCh() {
        $icao24List = ['4B3142'];
        $dbResult = [DummyLfrchTrafficDetail1::createDbResult()];
        $this->dbService->pushMockResult($dbResult);

        $result = $this->trafficRepo->readDetailsFromLfrCh($icao24List);

        $this->assertNotNull($result);
        $this->assertEquals(1, count($result));
        $this->assertEquals(DummyLfrchTrafficDetail1::create(), $result[0]);
        $this->assertRegExp('/' . $icao24List[0] . '/', $this->dbService->getAllQueriesString());
    }


    public function test_readDetailsFromLfrCh_escape_spechial_chars() {
        $icao24List = ["C0F'EE"];
        $this->dbService->pushMockResult([]);

        $result = $this->trafficRepo->readDetailsFromLfrCh($icao24List);

        $this->assertNotNull($result);
        $this->assertEquals(0, count($result));
        $this->assertRegExp("/C0F\\\\'EE/", $this->dbService->getAllQueriesString());
    }


    public function test_readDetailsFromBasestation() {
        $icao24List = ['4B3142'];
        $dbResult = [DummyBasestationTrafficDetail1::createDbResult()];
        $this->dbService->pushMockResult($dbResult);

        $result = $this->trafficRepo->readDetailsFromBasestation($icao24List);

        $this->assertNotNull($result);
        $this->assertEquals(1, count($result));
        $this->assertEquals(DummyBasestationTrafficDetail1::create(), $result[0]);
        $this->assertRegExp('/' . $icao24List[0] . '/', $this->dbService->getAllQueriesString());
    }


    public function test_readDetailsFromBasestation_escape_spechial_chars() {
        $icao24List = ["C0F'EE"];
        $this->dbService->pushMockResult([]);

        $result = $this->trafficRepo->readDetailsFromBasestation($icao24List);

        $this->assertNotNull($result);
        $this->assertEquals(0, count($result));
        $this->assertRegExp("/C0F\\\\'EE/", $this->dbService->getAllQueriesString());
    }


    public function test_readDetailsFromIcaoAcTypes() {
        $acIcaoTypeList = ['A320'];
        $dbResult = [
            DummyIcaoAcTypeTrafficDetail2::createDbResult(),
            DummyIcaoAcTypeTrafficDetail3::createDbResult(),
            DummyIcaoAcTypeTrafficDetail4::createDbResult()
        ];
        $this->dbService->pushMockResult($dbResult);

        $result = $this->trafficRepo->readDetailsFromIcaoAcTypes($acIcaoTypeList);

        $this->assertNotNull($result);
        $this->assertEquals(3, count($result));
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail2::create(), $result[0]);
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail3::create(), $result[1]);
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail4::create(), $result[2]);
        $this->assertRegExp('/' . $acIcaoTypeList[0] . '/', $this->dbService->getAllQueriesString());
    }


    public function test_readDetailsFromIcaoAcTypes_escape_spechial_chars() {
        $acIcaoTypeList = ["A3'0"];
        $this->dbService->pushMockResult([]);

        $result = $this->trafficRepo->readDetailsFromIcaoAcTypes($acIcaoTypeList);

        $this->assertNotNull($result);
        $this->assertEquals(0, count($result));
        $this->assertRegExp("/A3\\\\'0/", $this->dbService->getAllQueriesString());
    }
}
