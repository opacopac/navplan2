<?php declare(strict_types=1);

namespace NavplanTest\User\DomainModel;

use NavplanTest\User\Mocks\DummyUserPoint1;
use PHPUnit\Framework\TestCase;


class UserPointTest extends TestCase {
    public function test__construct() {
        $up = DummyUserPoint1::create();
        $this->assertNotNull($up);
    }
}
