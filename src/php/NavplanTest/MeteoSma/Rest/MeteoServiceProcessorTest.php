<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Rest;

use Navplan\MeteoSma\Rest\MeteoServiceProcessor;
use NavplanTest\MeteoSma\Mocks\DummySmaMeasurement1;
use NavplanTest\MeteoSma\Mocks\MockMeteoRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class MeteoServiceProcessorTest extends TestCase {
    private $config;
    /* @var $meteoRepo MockMeteoRepo */
    private $meteoRepo;
    /* @var $httpService MockHttpService */
    private $httpService;
    /* @var $meteoService MeteoServiceProcessor */
    private $meteoService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->meteoRepo = $this->config->getMeteoRepo();
        $this->httpService = $this->config->getSystemServiceFactory()->getHttpService();
        $this->meteoService = new MeteoServiceProcessor($this->config);
    }


    public function test_processRequest() {
        $args = array("minlon" => "7.0", "minlat" => "47.0", "maxlon" => "7.9", "maxlat" => "47.9",);
        $measurement1 = DummySmaMeasurement1::create();
        $this->meteoRepo->readSmaMeasurementsResult = [$measurement1];

        $this->meteoService->processRequest($args);

        $this->assertRegExp("/" . $measurement1->station->id . "/", $this->httpService->body);
    }
}
