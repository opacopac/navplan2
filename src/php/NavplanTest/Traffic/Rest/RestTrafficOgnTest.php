<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficOgn;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use PHPUnit\Framework\TestCase;


class RestTrafficTest extends TestCase {
    public function test_toRest() {
        $traffic1 = DummyOgnTraffic1::create();
        $traffic2 = DummyOgnTraffic2::create();
        $traffic3 = DummyOgnTraffic3::create();

        $restTraffic1 = RestTrafficOgn::toRest($traffic1);
        $restTraffic2 = RestTrafficOgn::toRest($traffic2);
        $restTraffic3 = RestTrafficOgn::toRest($traffic3);

        $this->assertEquals(DummyOgnTraffic1::createRest(), $restTraffic1);
        $this->assertEquals(DummyOgnTraffic2::createRest(), $restTraffic2);
        $this->assertEquals(DummyOgnTraffic3::createRest(), $restTraffic3);
    }
}
