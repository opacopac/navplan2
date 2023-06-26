<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\Rest\Model\RestTrafficDetailReadRequestConverter;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class TrafficDetailReadRequestConverterTest extends TestCase {
    public function test_fromRest() {
        $trafficDetailList = [DummyTrafficDetailResult1::createRest(), DummyTrafficDetailResult1::createRest()];
        $restRequest = array("aclist" => $trafficDetailList);

        $readTrafficDetailRequest = RestTrafficDetailReadRequestConverter::fromRest($restRequest);

        $this->assertNotNull($readTrafficDetailRequest);
        $this->assertCount(2, $readTrafficDetailRequest->trafficDetailList);
        $this->assertEquals(DummyTrafficDetailResult1::create(), $readTrafficDetailRequest->trafficDetailList[0]);
        $this->assertEquals(DummyTrafficDetailResult1::create(), $readTrafficDetailRequest->trafficDetailList[1]);
    }
}
