<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use InvalidArgumentException;
use Navplan\Flightroute\Domain\UpdateFlightrouteRequest;
use Navplan\Flightroute\UseCase\UpdateFlightroute;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\FlightrouteMockRepo;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class UpdateFlightrouteTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $userRepo MockUserRepo */
    private $userRepo;
    /* @var $flightrouteRepo FlightrouteMockRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new FlightrouteConfigMock();
        $this->flightrouteRepo = $this->config->getFlightrouteRepoFactory()->createFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
    }


    public function test__update() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create();
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readResult = $flightroute;
        $this->flightrouteRepo->updateResult = $flightroute;

        $request = new UpdateFlightrouteRequest($flightroute, $token);
        $response = (new UpdateFlightroute($this->config))->update($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($flightroute->id, $this->flightrouteRepo->readArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->readArgs[1]);
        $this->assertEquals($flightroute, $this->flightrouteRepo->updateArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->updateArgs[1]);
    }


    public function test__update_invalid_token() {
        $token = "dummy.token.123";
        $flightroute = DummyFlightroute1::create();
        $request = new UpdateFlightrouteRequest($flightroute, $token);
        try {
            (new UpdateFlightroute($this->config))->update($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->readArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->updateArgs);
        }
    }


    public function test__update_user_not_found() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $this->userRepo->readUserResult = NULL;
        $request = new UpdateFlightrouteRequest($flightroute, $token);
        try {
            (new UpdateFlightroute($this->config))->update($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->readArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->updateArgs);
        }
    }


    public function test__update_flightroute_not_found() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightroute = DummyFlightroute1::create();
        $user = DummyUser1::create();
        $this->userRepo->readUserResult = $user;
        $this->flightrouteRepo->readResult = NULL;

        $request = new UpdateFlightrouteRequest($flightroute, $token);
        try {
            (new UpdateFlightroute($this->config))->update($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals($flightroute->id, $this->flightrouteRepo->readArgs[0]);
            $this->assertEquals($user, $this->flightrouteRepo->readArgs[1]);
            $this->assertEquals(NULL, $this->flightrouteRepo->updateArgs);
        }
    }
}
