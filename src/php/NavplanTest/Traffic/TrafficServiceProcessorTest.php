<?php declare(strict_types=1);

namespace NavplanTest\Traffic;

use InvalidArgumentException;
use Navplan\Traffic\TrafficServiceProcessor;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use NavplanTest\Traffic\Mocks\MockAdsbexGateway;
use NavplanTest\Traffic\Mocks\MockOgnGateway;
use NavplanTest\Traffic\Mocks\MockTrafficRepo;
use PHPUnit\Framework\TestCase;


class TrafficServiceProcessorTest extends TestCase {
    private $config;
    /* @var $ognGateway MockOgnGateway */
    private $ognGateway;
    /* @var $adsbexGateway MockAdsbexGateway */
    private $adsbexGateway;
    /* @var $trafficRepo MockTrafficRepo */
    private $trafficRepo;
    /* @var $httpService MockHttpService */
    private $httpService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->ognGateway = $this->config->getOgnGateway();
        $this->adsbexGateway = $this->config->getAdsbexGateway();
        $this->trafficRepo = $this->config->getTrafficRepo();
        $this->httpService = $this->config->getSystemServiceFactory()->getHttpService();
    }


    public function test_processRequest_read_ogn_traffic() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_GET;
        $getVars = array(
            "action" => TrafficServiceProcessor::ACTION_READ_OGN_TRAFFIC,
            "minlon" => 7.0, "minlat" => 47.0, "maxlon" => 7.9, "maxlat" => 47.9,
            "maxagesec" => 120, "sessionid" => 123
        );
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [ DummyOgnTraffic1::create() ];

        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyOgnTraffic1::create()->acAddress . '/', $this->httpService->body);
    }


    public function test_processRequest_read_adsbex_traffic() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_GET;
        $getVars = array(
            "action" => TrafficServiceProcessor::ACTION_READ_ADSBEX_TRAFFIC,
            "minlon" => 7.0, "minlat" => 47.0, "maxlon" => 7.9, "maxlat" => 47.9,
            "maxagesec" => 120, "sessionid" => 123
        );
        $this->adsbexGateway->readTrafficResult = [ DummyAdsbexTraffic1::create() ];

        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyAdsbexTraffic1::create()->acAddress . '/', $this->httpService->body);
    }


    public function test_processRequest_read_aircraft_details() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_POST;
        $postVars = array(
            "action" => TrafficServiceProcessor::ACTION_READ_AC_DETAILS,
            "aclist" => [
                array("icao24" => "4B3142", "reg" => NULL, "model" => NULL, "manufacturer" => NULL,
                "ac_type" => NULL, "ac_class" => NULL, "eng_class" => NULL)
            ]
        );
        $this->trafficRepo->readDetailsFromLfrChResult = [ DummyLfrchTrafficDetail1::create() ];
        $this->trafficRepo->readDetailsFromBasestationResult = [ DummyBasestationTrafficDetail1::create() ];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [ DummyIcaoAcTypeTrafficDetail1::create() ];

        TrafficServiceProcessor::processRequest($reqMeth, NULL, $postVars, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyTrafficDetailResult1::create()->icao24 . '/', $this->httpService->body);
    }


    public function test_processRequest_throws_exception_for_unknown_req_method() {
        $reqMeth = 'XXX';
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceProcessor::processRequest($reqMeth, NULL, NULL, $this->config);
    }


    public function test_processRequest_throws_exception_for_unknown_get_action() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_GET;
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);
    }


    public function test_processRequest_throws_exception_for_unknown_post_action() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_POST;
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);
    }
}
