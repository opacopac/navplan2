<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DbRepo;

use Navplan\MeteoSma\DbRepo\DbSmaMeasurement;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockTimeService;
use PHPUnit\Framework\TestCase;


class DbSmaMeasurementTest extends TestCase {
    /* @var $timeService MockTimeService */
    private $timeService;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->timeService = $config->getSystemServiceFactory()->getTimeService();
    }


    public function test__construct() {
        $dbSmaMeasurement1 = DummySmaMeasurement1::createDbResult();
        $dbSmaMeasurement2 = DummySmaMeasurement2::createDbResult();
        $this->timeService->strtotimeRelativeDate = 1;

        $measurement1 = DbSmaMeasurement::fromDbResult($dbSmaMeasurement1, $this->timeService);
        $measurement2 = DbSmaMeasurement::fromDbResult($dbSmaMeasurement2, $this->timeService);

        $this->assertEquals(DummySmaMeasurement1::create(), $measurement1);
        $this->assertEquals(DummySmaMeasurement2::create(), $measurement2);
    }
}
