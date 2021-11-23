<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficAdsbexListResponseConverter;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexListResponseConverterTest extends TestCase {
    public function test_toRest_adsbex() {
        $trafficList = [DummyAdsbexTraffic1::create(), DummyAdsbexTraffic2::create(), DummyAdsbexTraffic3::create()];

        $restTrafficListResponse = RestTrafficAdsbexListResponseConverter::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertCount(3, $restTrafficListResponse["aclist"]);
        $this->assertEquals(DummyAdsbexTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyAdsbexTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
        $this->assertEquals(DummyAdsbexTraffic3::createRest(), $restTrafficListResponse["aclist"][2]);
    }
}
