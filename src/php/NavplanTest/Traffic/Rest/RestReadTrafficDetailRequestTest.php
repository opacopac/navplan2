<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestReadTrafficDetailRequest;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class RestReadTrafficDetailRequestTest extends TestCase {
    public function test_fromRest() {
        $trafficDetailList = [DummyTrafficDetailResult1::createRest(), DummyTrafficDetailResult1::createRest()];
        $restRequest = array("aclist" => $trafficDetailList);

        $readTrafficDetailRequest = RestReadTrafficDetailRequest::fromRest($restRequest);

        $this->assertNotNull($readTrafficDetailRequest);
        $this->assertEquals(2, count($readTrafficDetailRequest->trafficDetailList));
        $this->assertEquals(DummyTrafficDetailResult1::create(), $readTrafficDetailRequest->trafficDetailList[0]);
        $this->assertEquals(DummyTrafficDetailResult1::create(), $readTrafficDetailRequest->trafficDetailList[1]);
    }
}
