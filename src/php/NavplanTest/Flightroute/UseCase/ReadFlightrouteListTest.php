<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\ReadFlightrouteListRequest;
use Navplan\Flightroute\UseCase\ReadFlightrouteList;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class ReadFlightrouteListTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $userRepo MockUserRepo */
    private $userRepo;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__readList() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $flightroute1 = DummyFlightroute1::create();
        $flightroute2 = DummyFlightroute2::create();
        $user = DummyUser1::create($this->tokenService);
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readListResult = [$flightroute1, $flightroute2];

        $request = new ReadFlightrouteListRequest($token);
        $response = (new ReadFlightrouteList($this->config))->read($request);

        $this->assertEquals(2, count($response->flightrouteList));
        $this->assertEquals($flightroute1, $response->flightrouteList[0]);
        $this->assertEquals($flightroute2, $response->flightrouteList[1]);
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->readListArgs[0]);
    }


    public function test__readList_empty() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $user = DummyUser1::create($this->tokenService);
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readListResult = [];

        $request = new ReadFlightrouteListRequest($token);
        $response = (new ReadFlightrouteList($this->config))->read($request);

        $this->assertEquals(0, count($response->flightrouteList));
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->readListArgs[0]);
    }


    public function test__readList_invalid_token() {
        $token = "dummy.token.123";
        $request = new ReadFlightrouteListRequest($token);
        try {
            (new ReadFlightrouteList($this->config))->read($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->readListArgs);
        }
    }


    public function test__readList_user_not_found() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $this->userRepo->readUserResult = NULL;
        $request = new ReadFlightrouteListRequest($token);
        try {
            (new ReadFlightrouteList($this->config))->read($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->readListArgs);
        }
    }
}