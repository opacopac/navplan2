<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficAdsbex;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class RestTrafficAdsbexTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();

        $restTraffic1 = RestTrafficAdsbex::toRest($traffic1);
        $restTraffic2 = RestTrafficAdsbex::toRest($traffic2);
        $restTraffic3 = RestTrafficAdsbex::toRest($traffic3);

        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTraffic1);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTraffic2);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTraffic3);
    }
}
