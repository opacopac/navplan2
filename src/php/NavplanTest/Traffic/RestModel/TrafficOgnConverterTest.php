<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficOgnConverter;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use PHPUnit\Framework\TestCase;


class TrafficConverterTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyOgnTraffic1::create();
        $traffic2 = DummyOgnTraffic2::create();
        $traffic3 = DummyOgnTraffic3::create();

        $restTraffic1 = RestTrafficOgnConverter::toRest($traffic1);
        $restTraffic2 = RestTrafficOgnConverter::toRest($traffic2);
        $restTraffic3 = RestTrafficOgnConverter::toRest($traffic3);

        $this->assertEquals(DummyOgnTraffic1::createRest(), $restTraffic1);
        $this->assertEquals(DummyOgnTraffic2::createRest(), $restTraffic2);
        $this->assertEquals(DummyOgnTraffic3::createRest(), $restTraffic3);
    }
}
