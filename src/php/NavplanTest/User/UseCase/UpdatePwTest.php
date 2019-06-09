<?php declare(strict_types=1);

namespace NavplanTest\Shared;

// TODO => config
require_once __DIR__ . "/../../../config.php";

use Navplan\User\Domain\UpdatePwRequest;
use Navplan\User\UseCase\UpdatePw;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class UpdatePwTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;


    private function getUserRepoMock(): MockUserRepo {
        /* @var $userRepoMock MockUserRepo */
        $userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        return $userRepoMock;
    }


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
    }


    public function test_updatePassword_returns_a_success_response_and_updates_password() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, TRUE);
        $oldPassword = "123456";
        $newPassword = "654321";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $this->getUserRepoMock()->verifyPwHashResult = TRUE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);
        $response = (new UpdatePw($this->config))->updatePassword($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwHashArgs = $this->getUserRepoMock()->verifyPwHashArgs;
        $updatePwArgs = $this->getUserRepoMock()->updatePasswordArgs;

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
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123456";
        $newPassword = "654";
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);
        $response = (new UpdatePw($this->config))->updatePassword($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwHashArgs = $this->getUserRepoMock()->verifyPwHashArgs;
        $updatePwArgs = $this->getUserRepoMock()->updatePasswordArgs;

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
        $response = (new UpdatePw($this->config))->updatePassword($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwHashArgs = $this->getUserRepoMock()->verifyPwHashArgs;
        $updatePwArgs = $this->getUserRepoMock()->updatePasswordArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwHashArgs);
        $this->assertEquals(NULL, $updatePwArgs);
    }


    public function test_updatePassword_invalid_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "123";
        $newPassword = "654321";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);
        $response = (new UpdatePw($this->config))->updatePassword($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwHashArgs = $this->getUserRepoMock()->verifyPwHashArgs;
        $updatePwArgs = $this->getUserRepoMock()->updatePasswordArgs;

        $this->assertEquals(-3, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $verifyPwHashArgs);
        $this->assertEquals(NULL, $updatePwArgs);
    }


    public function test_updatePassword_wrong_old_password_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $oldPassword = "1234567";
        $newPassword = "654321";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $this->getUserRepoMock()->verifyPwHashResult = FALSE;
        $request = new UpdatePwRequest($token, $oldPassword, $newPassword);
        $response = (new UpdatePw($this->config))->updatePassword($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwHashArgs = $this->getUserRepoMock()->verifyPwHashArgs;
        $updatePwArgs = $this->getUserRepoMock()->updatePasswordArgs;

        $this->assertEquals(-3, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $verifyPwHashArgs[0]);
        $this->assertEquals($oldPassword, $verifyPwHashArgs[1]);
        $this->assertEquals(NULL, $updatePwArgs);
    }
}
