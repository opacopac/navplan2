<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DbRepo;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\MeteoSma\DbRepo\DbMeteoRepo;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MeteoSma\Mocks\DummySmaStationList1;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockDbService;
use NavplanTest\System\Mock\MockTimeService;
use PHPUnit\Framework\TestCase;


class DbMeteoRepoTest extends TestCase {
    private MockDbService $dbService;
    private MockTimeService $timeService;
    private DbMeteoRepo $dbMeteoRepo;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->dbService = $config->dbService;
        $this->timeService = $config->timeService;
        $this->dbMeteoRepo = new DbMeteoRepo($config->dbService, $config->timeService);
    }


    public function test_readSmaMeasurements() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $dbResult1 = DummySmaMeasurement1::createDbResult();
        $dbResult2 = DummySmaMeasurement2::createDbResult();
        $this->dbService->pushMockResult([$dbResult1, $dbResult2]);
        $this->timeService->strtotimeRelativeDate = 1;

        $result = $this->dbMeteoRepo->readSmaMeasurements($extent);

        $this->assertNotNull($result);
        $this->assertEquals(2, count($result));
        $this->assertEquals(DummySmaMeasurement1::create(), $result[0]);
        $this->assertEquals(DummySmaMeasurement2::create(), $result[1]);
    }


    public function test_replaceSmaStations()
    {
        $smaStationList = DummySmaStationList1::create();

        $this->dbMeteoRepo->replaceSmaStations($smaStationList);

        $this->assertEquals(3, count($this->dbService->queryList));
        $this->assertStringContainsString("TRUNCATE", $this->dbService->queryList[0]);
        $this->assertStringContainsString("INSERT", $this->dbService->queryList[1]);
        $this->assertStringContainsString("INSERT", $this->dbService->queryList[2]);
    }
}
