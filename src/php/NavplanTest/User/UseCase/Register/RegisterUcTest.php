<?php declare(strict_types=1);

namespace NavplanTest\Common;

use Navplan\User\DomainService\TokenService;
use Navplan\User\UseCase\Register\RegisterRequest;
use Navplan\User\UseCase\Register\RegisterUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class RegisterUcTest extends TestCase {
    private TokenService $tokenService;
    private MockUserRepo $userRepoMock;
    private RegisterUc $registerUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->tokenService = $config->getTokenService();
        $this->userRepoMock = $config->userRepo;
        $this->registerUc = $config->getRegisterUc();
    }


    public function test_register_returns_success_response_and_creates_new_user() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, TRUE);
        $password = "123456";
        $this->userRepoMock->checkEmailExistsResult = FALSE;
        $request = new RegisterRequest($token, $password, TRUE);

        $response = $this->registerUc->register($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $createUserArgs = $this->userRepoMock->createUserArgs;
        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $response->email);
        $this->assertEquals($token, $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $createUserArgs[0]);
        $this->assertEquals($password, $createUserArgs[1]);
    }


    public function test_register_invalid_pw_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, TRUE);
        $password = "1234";
        $request = new RegisterRequest($token, $password, TRUE);

        $response = $this->registerUc->register($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $createUserArgs = $this->userRepoMock->createUserArgs;
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

        $response = $this->registerUc->register($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $createUserArgs = $this->userRepoMock->createUserArgs;
        $this->assertEquals(-2, $response->code);
        $this->assertEquals(NULL, $response->email);
        $this->assertEquals(NULL, $response->token);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $createUserArgs);
    }


    public function test_register_existing_email_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, TRUE);
        $password = "123456";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $request = new RegisterRequest($token, $password, TRUE);

        $response = $this->registerUc->register($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $createUserArgs = $this->userRepoMock->createUserArgs;
        $this->assertEquals(-3, $response->code);
        $this->assertEquals(NULL, $response->email);
        $this->assertEquals(NULL, $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $createUserArgs);
    }
}
