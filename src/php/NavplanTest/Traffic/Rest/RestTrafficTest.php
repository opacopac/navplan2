<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Rest\RestTraffic;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class RestTrafficTest extends TestCase {
    private function assertEqualRestAndDomain(Traffic $traffic, array $restTraffic) {
        $this->assertEquals($traffic->acAddress, $restTraffic["acAddress"]);
        $this->assertEquals(TrafficAddressType::toString($traffic->addressType), $restTraffic["addressType"]);
        $this->assertEquals(TrafficAcType::toString($traffic->acType), $restTraffic["acType"]);
        $this->assertEquals($traffic->icaoType, $restTraffic["icaoType"]);
        $this->assertEquals($traffic->registration, $restTraffic["registration"]);
        $this->assertEquals($traffic->callsign, $restTraffic["callsign"]);
        $this->assertEquals($traffic->opIcao, $restTraffic["opIcao"]);
        $this->assertEquals($traffic->acModel, $restTraffic["acModel"]);
        $this->assertEquals(count($traffic->positionList), count($restTraffic["positionList"]));
    }


    public function test_toRest() {
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();

        $restTraffic1 = RestTraffic::toRest($traffic1);
        $restTraffic2 = RestTraffic::toRest($traffic2);
        $restTraffic3 = RestTraffic::toRest($traffic3);

        $this->assertEqualRestAndDomain($traffic1, $restTraffic1);
        $this->assertEqualRestAndDomain($traffic2, $restTraffic2);
        $this->assertEqualRestAndDomain($traffic3, $restTraffic3);
    }
}
