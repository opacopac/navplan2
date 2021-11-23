<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficAdsbexWithDetailsListResponseConverter;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexWithDetailsListResponseConverterTest extends TestCase {
    public function test_toRest() {
        $trafficList = [DummyAdsbexTrafficWithDetails1::create()];

        $restTrafficListResponse = RestTrafficAdsbexWithDetailsListResponseConverter::toRest($trafficList);

        $this->assertNotNull($restTrafficListResponse);
        $this->assertNotNull($restTrafficListResponse["aclist"]);
        $this->assertCount(1, $restTrafficListResponse["aclist"]);
        $this->assertEquals(DummyAdsbexTrafficWithDetails1::createRest(), $restTrafficListResponse["aclist"][0]);
    }
}
