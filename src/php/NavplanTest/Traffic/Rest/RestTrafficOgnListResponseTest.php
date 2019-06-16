<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficOgnListResponse;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use PHPUnit\Framework\TestCase;


class RestTrafficOgnListResponseTest extends TestCase {
    public function test_toRest_ogn() {
        $trafficList = [DummyOgnTraffic1::create(), DummyOgnTraffic2::create()];

        $restTrafficListResponse = RestTrafficOgnListResponse::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertEquals(2, count($restTrafficListResponse["aclist"]));
        $this->assertEquals(DummyOgnTraffic1::createRest(), $restTrafficListResponse["aclist"][0]);
        $this->assertEquals(DummyOgnTraffic2::createRest(), $restTrafficListResponse["aclist"][1]);
    }
}
