<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use InvalidArgumentException;
use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\Flightroute\UseCase\CreateFlightroute;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class CreateFlightrouteTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $userRepo MockUserRepo */
    private $userRepo;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
    }


    public function test__create() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create();
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->addResult = $flightroute;

        $request = new CreateFlightrouteRequest($flightroute, $token);
        $response = (new CreateFlightroute($this->config))->create($request);

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
            (new CreateFlightroute($this->config))->create($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->addArgs);
        }
    }


    public function test__create_user_not_found() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $this->userRepo->readUserResult = NULL;
        $request = new CreateFlightrouteRequest($flightroute, $token);
        try {
            (new CreateFlightroute($this->config))->create($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->addArgs);
        }
    }
}
