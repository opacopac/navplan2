<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\OpenAip\DbRepo\ReportingPointDbRepo;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\Shared\Domain\Polygon;
use NavplanTest\DbServiceMock;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use PHPUnit\Framework\TestCase;


class ReportingPointDbRepoTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): ReportingPointDbRepo {
        return $this->dbRepo;
    }


    private function assertEqualReportingPoint(array $dbRepPoint, ReportingPoint $repPoint) {
        $this->assertEquals($dbRepPoint['id'], $repPoint->id);
        $this->assertEquals($dbRepPoint['type'], $repPoint->type);
        $this->assertEquals($dbRepPoint['airport_icao'], $repPoint->airport_icao);
        $this->assertEquals($dbRepPoint['name'], $repPoint->name);
        $this->assertEquals($dbRepPoint['heli'], $repPoint->heli);
        $this->assertEquals($dbRepPoint['inbd_comp'], $repPoint->inbd_comp);
        $this->assertEquals($dbRepPoint['outbd_comp'], $repPoint->outbd_comp);
        $this->assertEquals($dbRepPoint['min_ft'], $repPoint->min_ft);
        $this->assertEquals($dbRepPoint['max_ft'], $repPoint->max_ft);
        $this->assertEquals($dbRepPoint['latitude'], $repPoint->latitude);
        $this->assertEquals($dbRepPoint['longitude'], $repPoint->longitude);
        $this->assertEquals($dbRepPoint['polygon'] ? Polygon::createFromString($dbRepPoint['polygon']) : NULL, $repPoint->polygon);
    }


    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new ReportingPointDbRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $repPointDbResult2 = DummyReportingSector1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1, $repPointDbResult2]);
        $repPointResultList = $this->getDbRepo()->searchByExtent(7.0, 47.0, 7.9, 47.9, 11);

        $this->assertEquals(2, count($repPointResultList));
        $this->assertEqualReportingPoint($repPointDbResult1, $repPointResultList[0]);
        $this->assertEqualReportingPoint($repPointDbResult2, $repPointResultList[1]);
    }


    public function test_searchByPosition() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1]);
        $repPointResultList = $this->getDbRepo()->searchByPosition(7.0, 47.0, 0.5, 20);

        $this->assertEquals(1, count($repPointResultList));
        $this->assertEqualReportingPoint($repPointDbResult1, $repPointResultList[0]);
    }


    public function test_searchByText() {
        $repPointDbResult1 = DummyReportingPoint1::createDbResult();
        $repPointDbResult2 = DummyReportingSector1::createDbResult();
        $this->getDbService()->pushMockResult([$repPointDbResult1, $repPointDbResult2]);
        $repPointResultList = $this->getDbRepo()->searchByText("LS", 20);

        $this->assertEquals(2, count($repPointResultList));
        $this->assertEqualReportingPoint($repPointDbResult1, $repPointResultList[0]);
        $this->assertEqualReportingPoint($repPointDbResult2, $repPointResultList[1]);
    }
}
