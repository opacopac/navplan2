<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficDetailListResponseConverter;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class TrafficDetailListResponseConverterTest extends TestCase {
    public function test_toRest() {
        $trafficDetailList = [DummyTrafficDetailResult1::create(), DummyTrafficDetailResult1::create()];

        $restTrafficDetailListResponse = RestTrafficDetailListResponseConverter::toRest($trafficDetailList);

        $this->assertNotNull($restTrafficDetailListResponse);
        $this->assertNotNull($restTrafficDetailListResponse["aclist"]);
        $this->assertCount(2, $restTrafficDetailListResponse["aclist"]);
        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetailListResponse["aclist"][0]);
        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetailListResponse["aclist"][1]);
    }
}
