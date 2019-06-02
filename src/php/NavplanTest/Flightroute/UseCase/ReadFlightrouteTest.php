<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use InvalidArgumentException;
use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\Flightroute\UseCase\ReadFlightroute;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\FlightrouteMockRepo;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\UserMockRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class ReadFlightrouteTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $userRepo UserMockRepo */
    private $userRepo;
    /* @var $flightrouteRepo FlightrouteMockRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new FlightrouteConfigMock();
        $this->flightrouteRepo = $this->config->getFlightrouteRepoFactory()->createFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
    }


    public function test__read() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightrouteId = 123;
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create();
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
        $token = UserHelper::createToken($email, FALSE);
        $flightrouteId = 123;
        $flightroute = NULL;
        $user = DummyUser1::create();
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
        $token = UserHelper::createToken($email, FALSE);
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
