<?php declare(strict_types=1);

namespace NavplanTest\Airspace\DomainModel;

use NavplanTest\Airspace\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceTest extends TestCase {
    public function test__construct() {
        $instance = DummyAirspace1::create();
        $this->assertNotNull($instance);
    }
}
