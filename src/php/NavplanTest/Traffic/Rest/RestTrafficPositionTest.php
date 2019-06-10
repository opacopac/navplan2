<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficPosition;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition3;
use PHPUnit\Framework\TestCase;


class RestTrafficPositionTest extends TestCase {
    public function test_toRest() {
        $pos1 = DummyAdsbexTrafficPosition1::create();
        $pos2 = DummyAdsbexTrafficPosition2::create();
        $pos3 = DummyAdsbexTrafficPosition3::create();

        $restPos1 = RestTrafficPosition::toRest($pos1);
        $restPos2 = RestTrafficPosition::toRest($pos2);
        $restPos3 = RestTrafficPosition::toRest($pos3);

        $this->assertEquals(DummyAdsbexTrafficPosition1::createRest(), $restPos1);
        $this->assertEquals(DummyAdsbexTrafficPosition2::createRest(), $restPos2);
        $this->assertEquals(DummyAdsbexTrafficPosition3::createRest(), $restPos3);
    }
}
