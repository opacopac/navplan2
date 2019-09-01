<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Rest;

use Navplan\MeteoSma\Rest\RestSmaMeasurement;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use PHPUnit\Framework\TestCase;


class RestSmaMeasurementTest extends TestCase {
    public function test_toRest() {
        $measurement1 = DummySmaMeasurement1::create();
        $measurement2 = DummySmaMeasurement2::create();

        $result1 = RestSmaMeasurement::toRest($measurement1);
        $result2 = RestSmaMeasurement::toRest($measurement2);

        $this->assertEquals(DummySmaMeasurement1::createRest(), $result1);
        $this->assertEquals(DummySmaMeasurement2::createRest(), $result2);
    }
}
