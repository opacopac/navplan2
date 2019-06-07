<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\User\Domain\ResetPwRequest;
use Navplan\User\UseCase\ResetPw;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\User\Mocks\MockUserConfig;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;

// TODO: inject with config
require_once __DIR__ . "/../../../config_test.php";


class ResetPwTest extends TestCase {
    /* @var $config MockUserConfig */
    private $config;


    private function getUserRepoMock(): MockUserRepo {
        /* @var $userRepoMock MockUserRepo */
        $userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        return $userRepoMock;
    }


    protected function setUp(): void {
        $this->config = new MockUserConfig();
    }


    public function test_resetPw_success_resultcode_is_0_and_token_is_valid_for_email() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $tokenEmail = UserHelper::getEmailFromToken($response->token);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, 0);
        $this->assertEquals($email, $tokenEmail);
        $this->assertEquals($email, $repoArgs[0]);
    }


    public function test_resetPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $this->getUserRepoMock()->checkEmailExistsResult = FALSE;
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -2);
        $this->assertEquals($email, $repoArgs[0]);
    }


    public function test_resetPw_token_empty_resultcode_is_n2() {
        $password = "123456";
        $token = "";
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -2);
        $this->assertEquals(NULL, $repoArgs);
    }


    public function test_resetPw_token_invalid_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = "xxx" . UserHelper::createToken($email, FALSE);
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -2);
        $this->assertEquals(NULL, $repoArgs);
    }


    public function test_resetPw_password_empty_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "";
        $token = UserHelper::createToken($email, FALSE);
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -1);
        $this->assertEquals(NULL, $repoArgs);
    }


    public function test_resetPw_password_too_short_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "12345";
        $token = UserHelper::createToken($email, FALSE);
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -1);
        $this->assertEquals(NULL, $repoArgs);
    }


    public function test_resetPw_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $token = UserHelper::createToken($email, FALSE);
        $request = new ResetPwRequest($token, $password, FALSE);
        $response = (new ResetPw($this->config))->resetPassword($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals($response->code, -1);
        $this->assertEquals(NULL, $repoArgs);
    }
}
