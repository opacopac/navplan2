<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\DomainModel;

use NavplanTest\Aerodrome\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportTest extends TestCase {
    public function test__construct() {
        $instance = DummyAirport1::create();
        $this->assertNotNull($instance);
    }
}
