<?php declare(strict_types=1);

namespace NavplanTest\User\Rest;

use Navplan\User\Rest\RestUserPoint;
use Navplan\User\Domain\UserPoint;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class UserPointRestTest extends TestCase {
    private function assertEqualUserPoint(array $upRest, UserPoint $up) {
        $this->assertEquals($upRest['id'], $up->id);
        $this->assertEquals($upRest['type'], $up->type);
        $this->assertEquals($upRest['name'], $up->name);
        $this->assertEquals($upRest['latitude'], $up->position->latitude);
        $this->assertEquals($upRest['longitude'], $up->position->longitude);
        $this->assertEquals($upRest['remark'], $up->remark);
        $this->assertEquals($upRest['supp_info'], $up->supp_info);
    }


    public function test_toArray_1() {
        $up = DummyUserPoint1::create();
        $upRest = RestUserPoint::toArray($up);

        $this->assertEqualUserPoint($upRest, $up);
    }


    public function test_toArray_2() {
        $up = DummyUserPoint2::create();
        $upRest = RestUserPoint::toArray($up);

        $this->assertEqualUserPoint($upRest, $up);
    }
}
