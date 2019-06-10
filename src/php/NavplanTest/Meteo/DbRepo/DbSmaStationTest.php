<?php declare(strict_types=1);

namespace NavplanTest\Meteo\DbRepo;

use Navplan\Meteo\DbRepo\DbSmaStation;
use NavplanTest\Meteo\Mocks\DummySmaStation1;
use NavplanTest\Meteo\Mocks\DummySmaStation2;
use PHPUnit\Framework\TestCase;


class DbSmaStationTest extends TestCase {
    public function test__construct() {
        $dbSmaStation1 = DummySmaStation1::createDbResult();
        $dbSmaStation2 = DummySmaStation2::createDbResult();

        $station1 = DbSmaStation::fromDbResult($dbSmaStation1);
        $station2 = DbSmaStation::fromDbResult($dbSmaStation2);

        $this->assertEquals(DummySmaStation1::create(), $station1);
        $this->assertEquals(DummySmaStation2::create(), $station2);
    }
}
