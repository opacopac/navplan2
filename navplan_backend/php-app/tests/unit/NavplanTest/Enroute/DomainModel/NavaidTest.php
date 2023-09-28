<?php declare(strict_types=1);

namespace NavplanTest\Enroute\DomainModel;

use NavplanTest\Enroute\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidTest extends TestCase {
    public function test__construct() {
        $instance = DummyNavaid1::create();
        $this->assertNotNull($instance);
    }
}
