<?php declare(strict_types=1);

namespace NavplanTest\Meteo\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Meteo\DbRepo\DbMeteoRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\Meteo\Mocks\DummySmaMeasurement1;
use NavplanTest\Meteo\Mocks\DummySmaMeasurement2;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockTimeService;
use PHPUnit\Framework\TestCase;


class DbMeteoRepoTest extends TestCase {
    /* @var $dbService MockDbService */
    private $dbService;
    /* @var $timeService MockTimeService */
    private $timeService;
    /* @var $dbMeteoRepo DbMeteoRepo */
    private $dbMeteoRepo;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->dbService = $config->getDbService();
        $this->timeService = $config->getSystemServiceFactory()->getTimeService();
        $this->dbMeteoRepo = new DbMeteoRepo($config->getDbService(), $config->getSystemServiceFactory());
    }


    public function test__readSmaMeasurements() {
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
}
