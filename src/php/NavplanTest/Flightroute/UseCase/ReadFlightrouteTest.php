<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\Flightroute\UseCase\ReadFlightroute;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class ReadFlightrouteTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $userRepo MockUserRepo */
    private $userRepo;
    /* @var $tokenService TokenService */
    private $tokenService;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $this->config->getTokenService();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
    }


    public function test__read() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightrouteId = 123;
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create($this->tokenService);
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readResult = $flightroute;

        $request = new ReadFlightrouteRequest($flightrouteId, $token);
        $response = (new ReadFlightroute($this->config))->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($flightrouteId, $this->flightrouteRepo->readArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->readArgs[1]);
    }


    public function test__read_not_found() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightrouteId = 123;
        $flightroute = NULL;
        $user = DummyUser1::create($this->tokenService);
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readResult = $flightroute;

        $request = new ReadFlightrouteRequest($flightrouteId, $token);
        $response = (new ReadFlightroute($this->config))->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($flightrouteId, $this->flightrouteRepo->readArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->readArgs[1]);
    }


    public function test__read_invalid_token() {
        $token = "dummy.token.123";
        $flightrouteId = 123;
        $request = new ReadFlightrouteRequest($flightrouteId, $token);
        try {
            (new ReadFlightroute($this->config))->read($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->readArgs);
        }
    }


    public function test__read_user_not_found() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightrouteId = 123;
        $this->userRepo->readUserResult = NULL;
        $request = new ReadFlightrouteRequest($flightrouteId, $token);
        try {
            (new ReadFlightroute($this->config))->read($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->readArgs);
        }
    }
}