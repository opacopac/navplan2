<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DbRepo;

use Navplan\MeteoSma\DbRepo\DbSmaStation;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use PHPUnit\Framework\TestCase;


class DbSmaStationTest extends TestCase {
    public function test__construct() {
        $dbSmaMeasurement1 = DummySmaMeasurement1::createDbResult();
        $dbSmaMeasurement2 = DummySmaMeasurement2::createDbResult();

        $station1 = DbSmaStation::fromDbResult($dbSmaMeasurement1);
        $station2 = DbSmaStation::fromDbResult($dbSmaMeasurement2);

        $this->assertEquals(DummySmaStation1::create(), $station1);
        $this->assertEquals(DummySmaStation2::create(), $station2);
    }
}
