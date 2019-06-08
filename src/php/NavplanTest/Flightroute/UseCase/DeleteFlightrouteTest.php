<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use InvalidArgumentException;
use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\Flightroute\UseCase\CreateFlightroute;
use Navplan\Flightroute\UseCase\DeleteFlightroute;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\User\Mocks\DummyUser1;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;
use Throwable;


class DeleteFlightrouteTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $userRepo MockUserRepo */
    private $userRepo;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new FlightrouteConfigMock();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
        $this->userRepo = $this->config->getUserRepoFactory()->createUserRepo();
    }


    public function test__delete() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightrouteId = 123;
        $user = DummyUser1::create();
        $this->userRepo->readUserResult = $user;

        $request = new DeleteFlightrouteRequest($flightrouteId, $token);
        (new DeleteFlightroute($this->config))->delete($request);

        $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
        $this->assertEquals($flightrouteId, $this->flightrouteRepo->deleteArgs[0]);
        $this->assertEquals($user, $this->flightrouteRepo->deleteArgs[1]);
    }


    public function test__delete_invalid_token() {
        $token = "dummy.token.123";
        $flightrouteId = 123;
        $request = new DeleteFlightrouteRequest($flightrouteId, $token);
        try {
            (new DeleteFlightroute($this->config))->delete($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals(NULL, $this->userRepo->readUserArgs);
            $this->assertEquals(NULL, $this->flightrouteRepo->deleteArgs);
        }
    }


    public function test__delete_user_not_found() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $flightrouteId = 123;
        $this->userRepo->readUserResult = NULL;
        $request = new DeleteFlightrouteRequest($flightrouteId, $token);
        try {
            (new DeleteFlightroute($this->config))->delete($request);
            $this->fail("InvalidArgumentException not thrown");
        } catch (Throwable $exception) {
            $this->assertInstanceOf(InvalidArgumentException::class, $exception);
            $this->assertEquals($email, $this->userRepo->readUserArgs[0]);
            $this->assertEquals(NULL, $this->flightrouteRepo->deleteArgs);
        }
    }
}
