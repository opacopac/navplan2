<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\TrafficOgnListResponseConverter;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use PHPUnit\Framework\TestCase;


class TrafficOgnListResponseConverterTest extends TestCase {
    public function test_toRest_ogn() {
        $trafficList = [DummyOgnTraffic1::create(), DummyOgnTraffic2::create()];

        $restTrafficListResponse = TrafficOgnListResponseConverter::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertCount(2, $restTrafficListResponse["aclist"]);
        $this->assertEquals(DummyOgnTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyOgnTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
    }
}
