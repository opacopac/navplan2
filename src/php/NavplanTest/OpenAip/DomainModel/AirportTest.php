<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DomainModel;

use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportTest extends TestCase {
    public function test__construct() {
        $instance = DummyAirport1::create();
        $this->assertNotNull($instance);
    }
}
