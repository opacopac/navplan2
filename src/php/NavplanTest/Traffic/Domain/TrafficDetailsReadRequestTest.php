<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Traffic\Domain\TrafficDetailsReadRequest;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use PHPUnit\Framework\TestCase;


class TrafficDetailsReadRequestTest extends TestCase {
    public function test_create_instance() {
        $trafficList = [DummyLfrchTrafficDetail1::create(), DummyBasestationTrafficDetail1::create()];

        $request = new TrafficDetailsReadRequest($trafficList);

        $this->assertNotNull($request);
        $this->assertEquals(2, count($request->trafficDetailList));
        $this->assertEquals($trafficList[0], $request->trafficDetailList[0]);
        $this->assertEquals($trafficList[1], $request->trafficDetailList[1]);
    }
}
