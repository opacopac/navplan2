<?php declare(strict_types=1);

namespace NavplanTest\Traffic;

use InvalidArgumentException;
use Navplan\Traffic\TrafficServiceProcessor;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class TrafficServiceProcessorTest extends TestCase {
    private $config;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
    }


    public function test_processRequest_ogn_gets_called() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_GET;
        $getVars = array("action" => TrafficServiceProcessor::ACTION_READ_ADSBEX_TRAFFIC);
        $this->expectException(InvalidArgumentException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);
    }


    public function test_processRequest_adsbex_gets_called() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_GET;
        $getVars = array("action" => TrafficServiceProcessor::ACTION_READ_OGN_TRAFFIC);
        $this->expectException(InvalidArgumentException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->config);
    }


    public function x_test_processRequest_read_aircraft_details_gets_called() {
        $reqMeth = TrafficServiceProcessor::REQUEST_METHOD_POST;
        $postVars = array("action" => TrafficServiceProcessor::ACTION_READ_AC_DETAILS);
        $this->expectException(InvalidArgumentException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, NULL, $postVars, $this->config);
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


    /*public function test_readTraffic_response_contains_correct_json_data() {
        unset($this->dummyArgs1["callback"]);
        $this->getFileService()->fileGetContentsResult = $this->dummyResponse1;
        AdsbexTraffic::readTraffic($this->dummyArgs1, $this->getFileService(), $this->getHttpService());

        $this->assertRegExp('/^\{\"ac\".*postime.*postime.*total.*\}$/', $this->getHttpService()->body);
    }*/
}
