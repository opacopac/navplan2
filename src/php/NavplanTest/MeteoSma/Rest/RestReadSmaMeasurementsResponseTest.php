<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Rest;

use Navplan\MeteoSma\Domain\ReadSmaMeasurementsResponse;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use PHPUnit\Framework\TestCase;


class RestReadSmaMeasurementsResponseTest extends TestCase {
    public function test_toRest() {
        $measurement1 = DummySmaMeasurement1::create();
        $measurement2 = DummySmaMeasurement2::create();

        $response = new ReadSmaMeasurementsResponse([$measurement1, $measurement2]);

        $this->assertEquals(2, count($response->smaMeasurementList));
        $this->assertEquals($measurement1, $response->smaMeasurementList[0]);
        $this->assertEquals($measurement2, $response->smaMeasurementList[1]);
    }
}
