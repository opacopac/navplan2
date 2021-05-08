<?php declare(strict_types=1);

namespace NavplanTest\Airport\DomainModel;

use NavplanTest\Airport\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportTest extends TestCase {
    public function test__construct() {
        $instance = DummyAirport1::create();
        $this->assertNotNull($instance);
    }
}
