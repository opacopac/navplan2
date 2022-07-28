<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestService;

use InvalidArgumentException;
use Navplan\Traffic\RestService\TrafficServiceController;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use NavplanTest\Traffic\Mocks\MockAdsbexService;
use NavplanTest\Traffic\Mocks\MockOgnService;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use PHPUnit\Framework\TestCase;


class TrafficServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockOgnService $ognGateway;
    private MockAdsbexService $adsbexGateway;
    private MockTrafficDetailRepo $trafficRepo;
    private MockHttpService $httpService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->ognGateway = $this->config->ognRepo;
        $this->adsbexGateway = $this->config->adsbexRepo;
        $this->trafficRepo = $this->config->trafficDetailRepo;
        $this->httpService = $this->config->httpService;
    }


    public function test_processRequest_read_ogn_traffic() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_GET;
        $getVars = array(
            "action" => TrafficServiceController::ACTION_READ_OGN_TRAFFIC,
            "minlon" => 7.0, "minlat" => 47.0, "maxlon" => 7.9, "maxlat" => 47.9,
            "maxagesec" => 120, "sessionid" => 123
        );
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [ DummyOgnTraffic1::create() ];

        TrafficServiceController::processRequest($reqMeth, $getVars, NULL, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyOgnTraffic1::create()->address->value . '/', $this->httpService->body);
    }


    public function test_processRequest_read_adsbex_traffic() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_GET;
        $getVars = array(
            "action" => TrafficServiceController::ACTION_READ_ADSBEX_TRAFFIC,
            "minlon" => 7.0, "minlat" => 47.0, "maxlon" => 7.9, "maxlat" => 47.9,
            "maxagesec" => 120, "sessionid" => 123
        );
        $this->adsbexGateway->readTrafficResult = [ DummyAdsbexTraffic1::create() ];

        TrafficServiceController::processRequest($reqMeth, $getVars, NULL, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyAdsbexTraffic1::create()->address->value . '/', $this->httpService->body);
    }


    public function test_processRequest_read_adsbex_traffic_with_detail() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_GET;
        $getVars = array(
            "action" => TrafficServiceController::ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS,
            "minlon" => 7.0, "minlat" => 47.0, "maxlon" => 7.9, "maxlat" => 47.9,
            "maxagesec" => 120, "sessionid" => 123
        );
        $this->adsbexGateway->readTrafficResult = [ DummyAdsbexTraffic1::create() ];
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [ DummyIcaoAcTypeTrafficDetail1::create() ];

        TrafficServiceController::processRequest($reqMeth, $getVars, NULL, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyAdsbexTrafficWithDetails1::create()->adsbTraffic->address->value . '/', $this->httpService->body);
    }


    public function test_processRequest_read_aircraft_details() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_POST;
        $postVars = array(
            "action" => TrafficServiceController::ACTION_READ_AC_DETAILS,
            "aclist" => [
                array("addr" => ["4B3142", "ICAO"], "reg" => NULL, "model" => NULL, "manufacturer" => NULL,
                "ac_type" => NULL, "ac_class" => NULL, "eng_class" => NULL)
            ]
        );
        $this->trafficRepo->readDetailsFromLfrChResult = [ DummyLfrchTrafficDetail1::create() ];
        $this->trafficRepo->readDetailsFromBasestationResult = [ DummyBasestationTrafficDetail1::create() ];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [ DummyIcaoAcTypeTrafficDetail1::create() ];

        TrafficServiceController::processRequest($reqMeth, NULL, $postVars, $this->config);

        $this->assertNotNull($this->httpService->body);
        $this->assertRegExp('/aclist/', $this->httpService->body);
        $this->assertRegExp('/' . DummyTrafficDetailResult1::create()->address->value . '/', $this->httpService->body);
    }


    public function test_processRequest_throws_exception_for_unknown_req_method() {
        $reqMeth = 'XXX';
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceController::processRequest($reqMeth, NULL, NULL, $this->config);
    }


    public function test_processRequest_throws_exception_for_unknown_get_action() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_GET;
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceController::processRequest($reqMeth, $getVars, NULL, $this->config);
    }


    public function test_processRequest_throws_exception_for_unknown_post_action() {
        $reqMeth = TrafficServiceController::REQUEST_METHOD_POST;
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);

        TrafficServiceController::processRequest($reqMeth, $getVars, NULL, $this->config);
    }
}
