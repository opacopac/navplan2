<?php declare(strict_types=1);

namespace NavplanTest\Flightroute;

use InvalidArgumentException;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\Flightroute\Rest\Converter\RestCreateFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestDeleteFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestReadSharedFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestUpdateFlightrouteRequestConverter;
use Navplan\User\Domain\Service\TokenService;
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

        FlightrouteController::processRequest($requestMethod, $getVars, $postVars, $this->config);
    }


    public function test_ReadSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_GET;
        $getVars = array(RestReadSharedFlightrouteRequestConverter::ARG_SHARE_ID => "123xyz456");
        $this->flightrouteRepo->readSharedResult = NULL;

        FlightrouteController::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readSharedArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_GET;
        $getVars = array(
            RestReadFlightrouteRequestConverter::ARG_ID => 123,
            RestReadFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readResult = NULL;

        FlightrouteController::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readArgs));
        $this->assertRegExp('/"navplan":null/', $this->httpService->body);
    }


    public function test_ReadFlightrouteList_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_GET;
        $getVars = array(
            RestReadFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readListResult = [];

        FlightrouteController::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->readListArgs));
        $this->assertRegExp("/\"navplanList\":\[\]/", $this->httpService->body);
    }


    public function test_CreateSharedFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_POST;
        $postVars = array(
            RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED => true,
            RestCreateSharedFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteController::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_CreateFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_POST;
        $postVars = array(
            RestCreateFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE),
            RestCreateFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->addResult = DummyFlightroute1::create();

        FlightrouteController::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->addArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }



    public function test_UpdateFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_PUT;
        $postVars = array(
            RestUpdateFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE),
            RestUpdateFlightrouteRequestConverter::ARG_ROUTE => DummyFlightroute1::createRestArgs()
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);
        $this->flightrouteRepo->readResult = DummyFlightroute1::create();
        $this->flightrouteRepo->updateResult = DummyFlightroute1::create();

        FlightrouteController::processRequest($requestMethod, NULL, $postVars, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->updateArgs));
        $this->assertRegExp('/"navplan":\{/', $this->httpService->body);
    }


    public function test_DeleteFlightroute_gets_called() {
        $requestMethod = FlightrouteController::REQ_METHOD_DELETE;
        $getVars = array(
            RestDeleteFlightrouteRequestConverter::ARG_ID => 123,
            RestDeleteFlightrouteRequestConverter::ARG_TOKEN => $this->tokenService->createToken('test@navplan.ch', FALSE)
        );
        $this->userRepo->readUserResult = DummyUser1::create($this->tokenService);

        FlightrouteController::processRequest($requestMethod, $getVars, NULL, $this->config);

        $this->assertGreaterThan(0, count($this->flightrouteRepo->deleteArgs));
        $this->assertRegExp('/"success":1/', $this->httpService->body);
    }
}
