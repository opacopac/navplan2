<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use Navplan\User\DomainService\TokenService;
use Navplan\User\UseCase\UpdatePw\UpdatePwRequest;
use Navplan\User\UseCase\UpdatePw\UpdatePwUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class UpdatePwUcTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockUserRepo $userRepoMock;
    private TokenService $tokenService;
    private UpdatePwUc $updatePwUc;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->userRepoMock = $this->config->userRepo;
        $this->tokenService = $this->config->getTokenService();
        $this->updatePwUc = $this->config->getUpdatePwUc();
    }


    public function test_updatePassword_returns_a_success_response_and_updates_password() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, TRUE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $this->userRepoMock->verifyPwHashResult = TRUE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);

        $response = $this->updatePwUc->updatePassword($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $verifyPwHashArgs = $this->userRepoMock->verifyPwHashArgs;
        $updatePwArgs = $this->userRepoMock->updatePasswordArgs;
        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $response->email);
        $this->assertEquals($token, $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $verifyPwHashArgs[0]);
        $this->assertEquals($oldPassword, $verifyPwHashArgs[1]);
        $this->assertEquals($email, $updatePwArgs[0]);
        $this->assertEquals($newPassword, $updatePwArgs[1]);
    }


    public function test_updatePassword_invalid_new_password_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654";
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);

        $response = $this->updatePwUc->updatePassword($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $verifyPwHashArgs = $this->userRepoMock->verifyPwHashArgs;
        $updatePwArgs = $this->userRepoMock->updatePasswordArgs;
        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwHashArgs);
        $this->assertEquals(NULL, $updatePwArgs);
    }


    public function test_updatePassword_invalid_token_returns_code_m2() {
        $token = "invalid.dummy.token";
        $oldPassword = "123456";
        $newPassword = "654321";
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);

        $response = $this->updatePwUc->updatePassword($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $verifyPwHashArgs = $this->userRepoMock->verifyPwHashArgs;
        $updatePwArgs = $this->userRepoMock->updatePasswordArgs;
        $this->assertEquals(-2, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwHashArgs);
        $this->assertEquals(NULL, $updatePwArgs);
    }


    public function test_updatePassword_invalid_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $oldPassword = "123";
        $newPassword = "654321";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);

        $response = $this->updatePwUc->updatePassword($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $verifyPwHashArgs = $this->userRepoMock->verifyPwHashArgs;
        $updatePwArgs = $this->userRepoMock->updatePasswordArgs;
        $this->assertEquals(-3, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $verifyPwHashArgs);
        $this->assertEquals(NULL, $updatePwArgs);
    }


    public function test_updatePassword_wrong_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = $this->tokenService->createToken($email, FALSE);
        $oldPassword = "1234567";
        $newPassword = "654321";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $this->userRepoMock->verifyPwHashResult = FALSE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);

        $response = $this->updatePwUc->updatePassword($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $verifyPwHashArgs = $this->userRepoMock->verifyPwHashArgs;
        $updatePwArgs = $this->userRepoMock->updatePasswordArgs;
        $this->assertEquals(-3, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $verifyPwHashArgs[0]);
        $this->assertEquals($oldPassword, $verifyPwHashArgs[1]);
        $this->assertEquals(NULL, $updatePwArgs);
    }
}
