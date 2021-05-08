<?php declare(strict_types=1);

namespace NavplanTest\Navaid\DomainModel;

use NavplanTest\Navaid\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidTest extends TestCase {
    public function test__construct() {
        $instance = DummyNavaid1::create();
        $this->assertNotNull($instance);
    }
}
