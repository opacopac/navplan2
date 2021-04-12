<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\RestModel;

use Navplan\MeteoSma\RestModel\SmaStationConverter;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use PHPUnit\Framework\TestCase;


class RestSmaStationTest extends TestCase {
    public function test_toRest() {
        $station1 = DummySmaStation1::create();
        $station2 = DummySmaStation2::create();

        $result1 = SmaStationConverter::toRest($station1);
        $result2 = SmaStationConverter::toRest($station2);

        $this->assertEquals(DummySmaStation1::createRest(), $result1);
        $this->assertEquals(DummySmaStation2::createRest(), $result2);
    }
}
