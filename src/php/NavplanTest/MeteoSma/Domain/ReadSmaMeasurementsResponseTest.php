<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Domain;

use Navplan\MeteoSma\Domain\ReadSmaMeasurementsResponse;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsResponseTest extends TestCase {
    public function test__construct() {
        $measurement1 = DummySmaMeasurement1::create();
        $measurement2 = DummySmaMeasurement2::create();
        $response = new ReadSmaMeasurementsResponse([$measurement1, $measurement2]);

        $this->assertNotNull($response);
        $this->assertEquals(2, count($response->smaMeasurementList));
        $this->assertEquals($measurement1, $response->smaMeasurementList[0]);
        $this->assertEquals($measurement2, $response->smaMeasurementList[1]);
    }
}
