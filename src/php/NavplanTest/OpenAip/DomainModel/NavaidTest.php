<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DomainModel;

use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidTest extends TestCase {
    public function test__construct() {
        $instance = DummyNavaid1::create();
        $this->assertNotNull($instance);
    }
}
