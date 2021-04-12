<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DomainModel;

use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use PHPUnit\Framework\TestCase;


class WebcamTest extends TestCase {
    public function test__construct() {
        $instance = DummyWebcam1::create();
        $this->assertNotNull($instance);
    }
}
