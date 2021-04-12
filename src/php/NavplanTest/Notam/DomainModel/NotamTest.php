<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DomainModel;

use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use PHPUnit\Framework\TestCase;


class NotamTest extends TestCase {
    public function test__construct() {
        $instance = DummyNotam1::create();
        $this->assertNotNull($instance);

        $instance2 = DummyNotam2::create();
        $this->assertNotNull($instance2);
    }
}
