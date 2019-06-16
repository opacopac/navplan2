<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Traffic\AdsbexRepo\AdsbexRepoTraffic;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\DummyAdsbexResponse123;
use PHPUnit\Framework\TestCase;


class AdsbexTrafficTest extends TestCase {
    public function test_fromResponse() {
        $traffic1 = AdsbexRepoTraffic::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 0);
        $traffic2 = AdsbexRepoTraffic::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 1);
        $traffic3 = AdsbexRepoTraffic::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 2);

        $this->assertNotNull($traffic1);
        $this->assertEquals($traffic1, DummyAdsbexTraffic1::create());
        $this->assertNotNull($traffic2);
        $this->assertEquals($traffic2, DummyAdsbexTraffic2::create());
        $this->assertNotNull($traffic3);
        $this->assertEquals($traffic3, DummyAdsbexTraffic3::create());
    }
}
