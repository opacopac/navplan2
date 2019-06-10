<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTraffic;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class RestTrafficTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();

        $restTraffic1 = RestTraffic::toRest($traffic1);
        $restTraffic2 = RestTraffic::toRest($traffic2);
        $restTraffic3 = RestTraffic::toRest($traffic3);

        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTraffic1);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTraffic2);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTraffic3);
    }
}
