<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficAdsbexListResponse;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class RestTrafficAdsbexListResponseTest extends TestCase {
    public function test_toRest_adsbex() {
        $trafficList = [DummyAdsbexTraffic1::create(), DummyAdsbexTraffic2::create(), DummyAdsbexTraffic3::create()];

        $restTrafficListResponse = RestTrafficAdsbexListResponse::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertEquals(3, count($restTrafficListResponse["aclist"]));
        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTrafficListResponse["aclist"][2]);
    }
}
