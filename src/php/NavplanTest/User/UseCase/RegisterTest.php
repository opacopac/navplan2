<?php declare(strict_types=1);

namespace NavplanTest\Shared;

// TODO => config
require_once __DIR__ . "/../../../config.php";

use Navplan\User\Domain\RegisterRequest;
use Navplan\User\UseCase\Register;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\User\Mocks\UserConfigMock;
use NavplanTest\User\Mocks\UserMockRepo;
use PHPUnit\Framework\TestCase;


class RegisterTest extends TestCase {
    /* @var $config UserConfigMock */
    private $config;


    private function getUserRepoMock(): UserMockRepo {
        /* @var $userRepoMock UserMockRepo */
        $userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        return $userRepoMock;
    }


    protected function setUp(): void {
        $this->config = new UserConfigMock();
    }



    public function test_register_returns_success_response_and_creates_new_user() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, TRUE);
        $password = "123456";
        $this->getUserRepoMock()->checkEmailExistsResult = FALSE;
        $request = new RegisterRequest($token, $password, TRUE);
        $response = (new Register($this->config))->register($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $createUserArgs = $this->getUserRepoMock()->createUserArgs;

        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $response->email);
        $this->assertEquals($token, $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $createUserArgs[0]);
        $this->assertEquals($password, $createUserArgs[1]);
    }


    public function test_register_invalid_pw_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, TRUE);
        $password = "1234";
        $request = new RegisterRequest($token, $password, TRUE);
        $response = (new Register($this->config))->register($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $createUserArgs = $this->getUserRepoMock()->createUserArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $response->email);
        $this->assertEquals(NULL, $response->token);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $createUserArgs);
    }


    public function test_register_invalid_token_returns_code_m2() {
        $token = "invalid.dummy.token";
        $password = "123456";
        $request = new RegisterRequest($token, $password, TRUE);
        $response = (new Register($this->config))->register($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $createUserArgs = $this->getUserRepoMock()->createUserArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals(NULL, $response->email);
        $this->assertEquals(NULL, $response->token);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $createUserArgs);
    }


    public function test_register_existing_email_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, TRUE);
        $password = "123456";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new RegisterRequest($token, $password, TRUE);
        $response = (new Register($this->config))->register($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $createUserArgs = $this->getUserRepoMock()->createUserArgs;

        $this->assertEquals(-3, $response->code);
        $this->assertEquals(NULL, $response->email);
        $this->assertEquals(NULL, $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $createUserArgs);
    }
}
