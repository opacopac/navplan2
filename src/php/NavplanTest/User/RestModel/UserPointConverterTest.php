<?php declare(strict_types=1);

namespace NavplanTest\User\RestModel;

use Navplan\User\DomainModel\UserPoint;
use Navplan\User\RestService\UserPointConverter;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class UserPointConverterTest extends TestCase {
    private function assertEqualUserPoint(array $upRest, UserPoint $up) {
        $this->assertEquals($upRest['id'], $up->id);
        $this->assertEquals($upRest['type'], $up->type);
        $this->assertEquals($upRest['name'], $up->name);
        $this->assertEquals($upRest['latitude'], $up->position->latitude);
        $this->assertEquals($upRest['longitude'], $up->position->longitude);
        $this->assertEquals($upRest['remark'], $up->remark);
        $this->assertEquals($upRest['supp_info'], $up->supp_info);
    }


    public function test_toRest_1() {
        $up = DummyUserPoint1::create();
        $upRest = UserPointConverter::toRest($up);

        $this->assertEqualUserPoint($upRest, $up);
    }


    public function test_toRest_2() {
        $up = DummyUserPoint2::create();
        $upRest = UserPointConverter::toRest($up);

        $this->assertEqualUserPoint($upRest, $up);
    }
}
