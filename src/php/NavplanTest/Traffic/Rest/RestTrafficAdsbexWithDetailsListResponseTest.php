<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficAdsbexWithDetailsListResponse;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use PHPUnit\Framework\TestCase;


class RestTrafficAdsbexWithDetailsListResponseTest extends TestCase {
    public function test_toRest() {
        $trafficList = [DummyAdsbexTrafficWithDetails1::create()];

        $restTrafficListResponse = RestTrafficAdsbexWithDetailsListResponse::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertEquals(1, count($restTrafficListResponse["aclist"]));
        $this->assertEquals(DummyAdsbexTrafficWithDetails1::createRest(), $restTrafficListResponse["aclist"][0]);
    }
}
