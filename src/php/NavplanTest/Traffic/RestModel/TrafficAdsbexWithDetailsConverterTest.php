<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\TrafficAdsbexWithDetailsConverter;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexWithDetailsConverterTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyAdsbexTrafficWithDetails1::create();

        $restTraffic1 = TrafficAdsbexWithDetailsConverter::toRest($traffic1);

        $this->assertEquals(DummyAdsbexTrafficWithDetails1::createRest(), $restTraffic1);
    }
}
