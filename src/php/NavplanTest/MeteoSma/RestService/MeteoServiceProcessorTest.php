<?php declare(strict_types=1);

namespace NavplanTest\Meteo\RestService;

use Navplan\MeteoSma\RestService\MeteoSmaController;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\MockMeteoSmaRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class MeteoServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockMeteoSmaRepo $meteoRepo;
    private MockHttpService $httpService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->meteoRepo = $this->config->meteoService;
        $this->httpService = $this->config->httpService;
    }


    public function test_processRequest() {
        $args = array("minlon" => "7.0", "minlat" => "47.0", "maxlon" => "7.9", "maxlat" => "47.9",);
        $measurement1 = DummySmaMeasurement1::create();
        $this->meteoRepo->readSmaMeasurementsResult = [$measurement1];

        MeteoSmaController::processRequest($args, $this->config);

        $this->assertRegExp("/" . $measurement1->station->id . "/", $this->httpService->body);
    }
}
