<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficListResponse;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use PHPUnit\Framework\TestCase;


class RestTrafficListResponseTest extends TestCase {
    public function test_toRest_ogn() {
        $trafficList = [DummyOgnTraffic1::create(), DummyOgnTraffic2::create()];

        $restTrafficListResponse = RestTrafficListResponse::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertEquals(2, count($restTrafficListResponse["aclist"]));
        $this->assertEquals(DummyOgnTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyOgnTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
    }


    public function test_toRest_adsbex() {
        $trafficList = [DummyAdsbexTraffic1::create(), DummyAdsbexTraffic2::create(), DummyAdsbexTraffic3::create()];

        $restTrafficListResponse = RestTrafficListResponse::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertEquals(3, count($restTrafficListResponse["aclist"]));
        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTrafficListResponse["aclist"][2]);
    }
}
