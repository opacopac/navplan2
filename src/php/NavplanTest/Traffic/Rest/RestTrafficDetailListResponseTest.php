<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Rest\RestTraffic;
use Navplan\Traffic\Rest\RestTrafficDetail;
use Navplan\Traffic\Rest\RestTrafficDetailListResponse;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class RestTrafficDetailListResponseTest extends TestCase {
    public function test_toRest() {
        $trafficDetailList = [DummyTrafficDetailResult1::create(), DummyTrafficDetailResult1::create()];

        $restTrafficDetailListResponse = RestTrafficDetailListResponse::toRest($trafficDetailList);

        $this->assertNotNull($restTrafficDetailListResponse);
        $this->assertNotNull($restTrafficDetailListResponse["aclist"]);
        $this->assertEquals(2, count($restTrafficDetailListResponse["aclist"]));
        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetailListResponse["aclist"][0]);
        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetailListResponse["aclist"][1]);
    }
}
