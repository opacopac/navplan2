<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Domain;

use NavplanTest\Meteo\Mocks\DummySmaStation1;
use NavplanTest\Meteo\Mocks\DummySmaStation2;
use PHPUnit\Framework\TestCase;


class SmaStationTest extends TestCase {
    public function test__construct() {
        $station1 = DummySmaStation1::create();
        $station2 = DummySmaStation2::create();

        $this->assertNotNull($station1);
        $this->assertNotNull($station2);
    }
}
