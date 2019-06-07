<?php declare(strict_types=1);

namespace NavplanTest\Flightroute;

// TODO => config
require_once __DIR__ . "/../../config_test.php";

use Navplan\Flightroute\FlightrouteServiceProcessor;
use Navplan\Flightroute\Rest\RestCreateFlightrouteRequest;
use Navplan\Flightroute\Rest\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestDeleteFlightrouteRequest;
use Navplan\Flightroute\Rest\RestReadFlightrouteRequest;
use Navplan\Flightroute\Rest\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestUpdateFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\FlightrouteMockRepo;
use NavplanTest\System\Mock\MockHttpResponseService;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class FlightrouteServiceProcessorTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $httpService MockHttpResponseService */
    private $httpService;
    /* @var $flightrouteRepo FlightrouteMockRepo */
    private $flightrouteRepo;
    /* @var $userRepo MockUserRepo */
    private $userRepo;


    protected function setUp(): void {
        $this->config = new FlightrouteConfigMock();
        $this->httpService = $this->config->getHttpResponseService();
        $this->flightrouteRepo = $this->config->getFlightrouteRepoFactory()->createFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
    }


    public function test_unknown_request_method_throws_error() {
        $requestMethod = "dummy";
        $getVars = array("dummy" => "dummy");
        $postVars = array("dummy2" => "dummy2");
        $this->expectException("InvalidArgumentException");

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, $postVars, $this->config);
    }


    public function test_ReadSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(RestReadSharedFlightrouteRequest::ARG_SHARE_ID => "123xyz456");
        $this->flightrouteRepo->readSharedResult = NULL;

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readSharedArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(
            RestReadFlightrouteRequest::ARG_ID => 123,
            RestReadFlightrouteRequest::ARG_TOKEN => UserHelper::createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create();
        $this->flightrouteRepo->readResult = NULL;

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightrouteList_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(
            RestReadFlightrouteRequest::ARG_TOKEN => UserHelper::createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create();
        $this->flightrouteRepo->readListResult = [];

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readListArgs));
        $this->assertRegExp("/\"navplanList\":\[\]/", $this->httpService->body);
    }


    public function test_CreateSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_POST;
        $postVars = array(
            RestCreateSharedFlightrouteRequest::ARG_CREATE_SHARED => true,
            RestCreateSharedFlightrouteRequest::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_CreateFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_POST;
        $postVars = array(
            RestCreateFlightrouteRequest::ARG_TOKEN => UserHelper::createToken('test@navplan.ch', FALSE),
            RestCreateFlightrouteRequest::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create();
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }



    public function test_UpdateFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_PUT;
        $postVars = array(
            RestUpdateFlightrouteRequest::ARG_TOKEN => UserHelper::createToken('test@navplan.ch', FALSE),
            RestUpdateFlightrouteRequest::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create();
        $this->flightrouteRepo->readResult = DummyFlightroute1::create();
        $this->flightrouteRepo->updateResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->updateArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_DeleteFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_DELETE;
        $getVars = array(
            RestDeleteFlightrouteRequest::ARG_ID => 123,
            RestDeleteFlightrouteRequest::ARG_TOKEN => UserHelper::createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->deleteArgs));
        $this->assertRegExp('/"success":1/', $this->httpService->body);
    }
}
