<?php declare(strict_types=1);

namespace NavplanTest\Enroute\DomainModel;

use NavplanTest\Enroute\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceTest extends TestCase {
    public function test__construct() {
        $instance = DummyAirspace1::create();
        $this->assertNotNull($instance);
    }
}
