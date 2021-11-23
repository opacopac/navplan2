<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficAdsbexConverter;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexConverterTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();

        $restTraffic1 = RestTrafficAdsbexConverter::toRest($traffic1);
        $restTraffic2 = RestTrafficAdsbexConverter::toRest($traffic2);
        $restTraffic3 = RestTrafficAdsbexConverter::toRest($traffic3);

        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTraffic1);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTraffic2);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTraffic3);
    }
}
