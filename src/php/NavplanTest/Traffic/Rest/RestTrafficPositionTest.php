<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficDataSource;
use Navplan\Traffic\Domain\TrafficPosition;
use Navplan\Traffic\Domain\TrafficPositionMethod;
use Navplan\Traffic\Rest\RestTrafficPosition;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition3;
use PHPUnit\Framework\TestCase;


class RestTrafficPositionTest extends TestCase {
    private function assertEqualRestAndDomain(TrafficPosition $pos, array $restPos) {
        $this->assertEquals(TrafficDataSource::toString($pos->source), $restPos["source"]);
        $this->assertEquals(TrafficPositionMethod::toString($pos->method), $restPos["method"]);
        $this->assertEquals($pos->receiver, $restPos["receiver"]);
        $this->assertEquals($pos->received, $restPos["timestamp"]);
        $this->assertEquals(round($pos->position->longitude, RestTrafficPosition::ROUND_POS_TO_DIGITS), $restPos["position"][0]);
        $this->assertEquals(round($pos->position->latitude, RestTrafficPosition::ROUND_POS_TO_DIGITS), $restPos["position"][1]);
    }


    public function test_toRest() {
        $pos1 = DummyAdsbexTrafficPosition1::create();
        $pos2 = DummyAdsbexTrafficPosition2::create();
        $pos3 = DummyAdsbexTrafficPosition3::create();

        $restPos1 = RestTrafficPosition::toRest($pos1);
        $restPos2 = RestTrafficPosition::toRest($pos2);
        $restPos3 = RestTrafficPosition::toRest($pos3);

        $this->assertEqualRestAndDomain($pos1, $restPos1);
        $this->assertEqualRestAndDomain($pos2, $restPos2);
        $this->assertEqualRestAndDomain($pos3, $restPos3);
    }
}
