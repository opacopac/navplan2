<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DbRepo;

use Navplan\MeteoSma\DbRepo\DbSmaStation;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class DbSmaStationTest extends TestCase {
    /* @var $mockDbService MockDbService */
    private $mockDbService;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->mockDbService = $config->getDbService();
    }


    public function test__construct() {
        $dbSmaMeasurement1 = DummySmaMeasurement1::createDbResult();
        $dbSmaMeasurement2 = DummySmaMeasurement2::createDbResult();

        $station1 = DbSmaStation::fromDbResult($dbSmaMeasurement1);
        $station2 = DbSmaStation::fromDbResult($dbSmaMeasurement2);

        $this->assertEquals(DummySmaStation1::create(), $station1);
        $this->assertEquals(DummySmaStation2::create(), $station2);
    }


    public function test_fromDbResult_1() {
        $dbResult = DummySmaStation1::createDbResult();

        $station = DbSmaStation::fromDbResult($dbResult);

        $this->assertEquals(DummySmaStation1::create(), $station);
    }


    public function test_fromDbResult_2() {
        $dbResult = DummySmaStation2::createDbResult();

        $station = DbSmaStation::fromDbResult($dbResult);

        $this->assertEquals(DummySmaStation2::create(), $station);
    }


    public function test_toInsertQuery_1() {
        $station = DummySmaStation1::create();

        $query = DbSmaStation::toInsertQuery($this->mockDbService, $station);

        $this->assertStringContainsString("INSERT", $query);
        $this->assertStringContainsString($station->id, $query);
        $this->assertStringContainsString($station->name, $query);
        $this->assertStringContainsString(strval($station->position->latitude), $query);
        $this->assertStringContainsString(strval($station->position->longitude), $query);
        $this->assertStringContainsString(strval($station->altitude->value), $query);
    }


    public function test_toInsertQuery_2() {
        $station = DummySmaStation2::create();

        $query = DbSmaStation::toInsertQuery($this->mockDbService, $station);

        $this->assertStringContainsString("INSERT", $query);
        $this->assertStringContainsString($station->id, $query);
        $this->assertStringContainsString($station->name, $query);
        $this->assertStringContainsString(strval($station->position->latitude), $query);
        $this->assertStringContainsString(strval($station->position->longitude), $query);
        $this->assertStringContainsString(strval($station->altitude->value), $query);
    }
}
