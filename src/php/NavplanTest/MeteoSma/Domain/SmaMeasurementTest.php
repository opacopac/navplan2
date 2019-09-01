<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Domain;

use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use PHPUnit\Framework\TestCase;


class SmaMeasurementTest extends TestCase {
    public function test__construct() {
        $measurement1 = DummySmaMeasurement1::create();
        $measurement2 = DummySmaMeasurement2::create();

        $this->assertNotNull($measurement1);
        $this->assertNotNull($measurement2);
    }
}
