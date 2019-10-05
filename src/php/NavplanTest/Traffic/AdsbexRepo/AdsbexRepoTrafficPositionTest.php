<?php declare(strict_types=1);

namespace NavplanTest\Traffic\AdsbexRepo;

use Navplan\Traffic\AdsbexRepo\AdsbexRepoTrafficPosition;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition3;
use NavplanTest\Traffic\Mocks\DummyAdsbexResponse123;
use PHPUnit\Framework\TestCase;


class AdsbexRepoTrafficPositionTest extends TestCase {
    public function test_fromResponse() {
        $pos1 = AdsbexRepoTrafficPosition::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 0);
        $pos2 = AdsbexRepoTrafficPosition::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 1);
        $pos3 = AdsbexRepoTrafficPosition::fromResponse(json_decode(DummyAdsbexResponse123::createAdsbexResponse(), true), 2);

        $this->assertNotNull($pos1);
        $this->assertEquals($pos1, DummyAdsbexTrafficPosition1::create());
        $this->assertNotNull($pos2);
        $this->assertEquals($pos2, DummyAdsbexTrafficPosition2::create());
        $this->assertNotNull($pos3);
        $this->assertEquals($pos3, DummyAdsbexTrafficPosition3::create());
    }
}
