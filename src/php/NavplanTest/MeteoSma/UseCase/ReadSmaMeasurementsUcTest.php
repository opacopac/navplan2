<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\UseCase;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsRequest;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsUc;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MeteoSma\Mocks\MockMeteoSmaRepo;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsUcTest extends TestCase {
    private MockMeteoSmaRepo $meteoRepo;
    private ReadSmaMeasurementsUc $readSmaMeasurements;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->meteoRepo = $config->meteoService;
        $this->readSmaMeasurements = $config->getReadSmaMeasurementsUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->readSmaMeasurements);
    }


    public function test_read() {
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $request = new ReadSmaMeasurementsRequest($extent);
        $measurement1 = DummySmaMeasurement1::create();
        $measurement2 = DummySmaMeasurement2::create();
        $this->meteoRepo->readSmaMeasurementsResult = [$measurement1, $measurement2];

        $response = $this->readSmaMeasurements->read($request);

        $this->assertNotNull($response);
        $this->assertEquals(2, count($response->smaMeasurementList));
        $this->assertEquals($measurement1, $response->smaMeasurementList[0]);
        $this->assertEquals($measurement2, $response->smaMeasurementList[1]);
    }
}
