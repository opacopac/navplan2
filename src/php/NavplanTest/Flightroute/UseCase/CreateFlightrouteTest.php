<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\UseCase\CreateFlightroute\CreateFlightrouteRequest;
use Navplan\User\DomainService\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class CreateFlightrouteTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockUserRepo $userRepo;
    private TokenService $tokenService;
    private MockFlightrouteRepo $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->flightrouteRepo = $this->config->flightrouteRepo;
        $this->userRepo = $this->config->userRepo;
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__create() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create($this->tokenService);
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->addResult = $flightroute;

        $request = new CreateFlightrouteRequest($flightroute, $token);
        $response = $this->config->getCreateFlightrouteUc()->create($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($flightroute, $this->flightrouteRepo->addArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->addArgs[1]);
    }


    public function test__create_invalid_token() {
        $token = "dummy.token.123";
        $flightroute = DummyFlightroute1::create();
        $request = new CreateFlightrouteRequest($flightroute, $token);
        try {
            $this->config->getCreateFlightrouteUc()->create($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->addArgs);
        }
    }


    public function test__create_user_not_found() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $this->userRepo->readUserResult = NULL;
        $request = new CreateFlightrouteRequest($flightroute, $token);
        try {
            $this->config->getCreateFlightrouteUc()->create($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->addArgs);
        }
    }
}
