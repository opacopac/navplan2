<?php declare(strict_types=1);

namespace NavplanTest\Shared;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\User\Domain\LoginRequest;
use Navplan\User\UseCase\Login;
use NavplanTest\MockNavplanConfig;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class LoginTest extends TestCase {
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


    public function test_login_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $password = "123456";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $this->getUserRepoMock()->verifyPwHashResult = TRUE;
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $verifyPwArgs[0]);
        $this->assertEquals($password, $verifyPwArgs[1]);
    }


    public function test_login_wrong_password_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $this->getUserRepoMock()->verifyPwHashResult = FALSE;
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $verifyPwArgs[0]);
        $this->assertEquals($password, $verifyPwArgs[1]);
    }


    public function test_login_email_not_found_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "123456";
        $this->getUserRepoMock()->checkEmailExistsResult = FALSE;
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $verifyPwArgs);
    }


    public function test_login_email_empty_resultcode_is_n1() {
        $email = "";
        $password = "123456";
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwArgs);
    }


    public function test_login_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $password = "123456";
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwArgs);
    }


    public function test_login_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $password = "123456";
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwArgs);
    }


    public function test_login_password_empty_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "";
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $verifyPwArgs);
    }


    public function test_login_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new LoginRequest($email, $password, FALSE);
        $response = (new Login($this->config))->login($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;
        $verifyPwArgs = $this->getUserRepoMock()->verifyPwHashArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $verifyPwArgs);
    }
}
