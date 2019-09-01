<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\MeteoSma\Domain\ReadSmaMeasurementsRequest;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement2;
use NavplanTest\MeteoSma\Mocks\MockMeteoRepo;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsTest extends TestCase {
    /* @var $meteoRepo MockMeteoRepo */
    private $meteoRepo;
    /* @var $readSmaMeasurements ReadSmaMeasurements */
    private $readSmaMeasurements;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->meteoRepo = $config->getMeteoRepo();
        $this->readSmaMeasurements = new ReadSmaMeasurements($config);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->readSmaMeasurements);
    }


    public function test_read() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
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
