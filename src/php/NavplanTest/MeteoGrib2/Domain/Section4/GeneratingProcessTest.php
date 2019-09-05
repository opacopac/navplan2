<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section4;

use NavplanTest\MeteoGrib2\Mocks\Section4\DummyGeneratingProcess1;
use PHPUnit\Framework\TestCase;


class GeneratingProcessTest extends TestCase {
    public function test_create_instance() {
        $process = DummyGeneratingProcess1::create();

        $this->assertEquals(2, $process->getType());
        $this->assertEquals(255, $process->getBackgroundIdentifier());
        $this->assertEquals(255, $process->getModel());
    }
}
