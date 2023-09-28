<?php declare(strict_types=1);

namespace NavplanTest\Traffic\AdsbexRepo;

use Navplan\Traffic\Adsbex\Model\AdsbexTrafficConverter;
use NavplanTest\Traffic\Mocks\DummyAdsbexResponse123;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class AdsbexRepoTrafficTest extends TestCase {
    public function test_fromResponse() {
        $traffic1 = AdsbexTrafficConverter::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 0);
        $traffic2 = AdsbexTrafficConverter::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 1);
        $traffic3 = AdsbexTrafficConverter::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 2);

        $this->assertNotNull($traffic1);
        $this->assertEquals($traffic1, DummyAdsbexTraffic1::create());
        $this->assertNotNull($traffic2);
        $this->assertEquals($traffic2, DummyAdsbexTraffic2::create());
        $this->assertNotNull($traffic3);
        $this->assertEquals($traffic3, DummyAdsbexTraffic3::create());
    }
}
