<?php declare(strict_types=1);

namespace NavplanTest\Flightroute;

use InvalidArgumentException;
use Navplan\Flightroute\RestModel\CreateFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\CreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\DeleteFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\ReadFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\ReadSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\UpdateFlightrouteRequestConverter;
use Navplan\Flightroute\RestService\FlightrouteServiceProcessor;
use Navplan\User\DomainService\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class FlightrouteServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockHttpService $httpService;
    private MockFlightrouteRepo $flightrouteRepo;
    private MockUserRepo $userRepo;
    private TokenService $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->httpService = $this->config->httpService;
        $this->flightrouteRepo = $this->config->flightrouteRepo;
        $this->userRepo = $this->config->userRepo;
        $this->tokenService = $this->config->getTokenService();
    }


    public function test_unknown_request_method_throws_error() {
        $requestMethod = "dummy";
        $getVars = array("dummy" => "dummy");
        $postVars = array("dummy2" => "dummy2");
        $this->expectException(InvalidArgumentException::class);

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, $postVars, $this->config);
    }


    public function test_ReadSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(ReadSharedFlightrouteRequestConverter::ARG_SHARE_ID => "123xyz456");
        $this->flightrouteRepo->readSharedResult = NULL;

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readSharedArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(
            ReadFlightrouteRequestConverter::ARG_ID => 123,
            ReadFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readResult = NULL;

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightrouteList_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_GET;
        $getVars = array(
            ReadFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readListResult = [];

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readListArgs));
        $this->assertRegExp("/\"navplanList\":\[\]/", $this->httpService->body);
    }


    public function test_CreateSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_POST;
        $postVars = array(
            CreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED => true,
            CreateSharedFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_CreateFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_POST;
        $postVars = array(
            CreateFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE),
            CreateFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }



    public function test_UpdateFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_PUT;
        $postVars = array(
            UpdateFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE),
            UpdateFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readResult = DummyFlightroute1::create();
        $this->flightrouteRepo->updateResult = DummyFlightroute1::create();

        FlightrouteServiceProcessor::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->updateArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_DeleteFlightroute_gets_called() {
        $requestMethod = FlightrouteServiceProcessor::REQ_METHOD_DELETE;
        $getVars = array(
            DeleteFlightrouteRequestConverter::ARG_ID => 123,
            DeleteFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);

        FlightrouteServiceProcessor::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->deleteArgs));
        $this->assertRegExp('/"success":1/', $this->httpService->body);
    }
}
