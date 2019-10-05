<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficAdsbexWithDetails;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use PHPUnit\Framework\TestCase;


class RestTrafficAdsbexWithDetailsTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyAdsbexTrafficWithDetails1::create();

        $restTraffic1 = RestTrafficAdsbexWithDetails::toRest($traffic1);

        $this->assertEquals(DummyAdsbexTrafficWithDetails1::createRest(), $restTraffic1);
    }
}
