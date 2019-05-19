<?php declare(strict_types=1);

namespace NavplanTest\Shared;

require_once __DIR__ . "/../../config_test.php";

use Navplan\Shared\DbException;
use Navplan\User\UserHelper;
use Navplan\User\UserLogin;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class UserLoginTest extends TestCase {
    private $dbService;
    private $httpService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->httpService = new HttpResponseServiceMock();
    }

    // region autoLogin

    public function test_autoLogin_success_resultcode_is_0() {
        $token = UserHelper::createToken("test@navplan.ch", false);
        $args = array("token" => $token);

        UserLogin::autoLogin($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":0/', $this->getHttpService()->body);
    }


    public function test_autoLogin_invalid_token_resultcode_is_n1() {
        $args = array("token" => "invalid.dummy.token");

        UserLogin::autoLogin($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    public function test_autoLogin_no_token_resultcode_is_n1() {
        $args = array("wrongarg" => "dummy");

        UserLogin::autoLogin($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    public function test_autoLogin_expired_token_resultcode_is_n1() {
        $expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array("token" => $expiredToken);

        UserLogin::autoLogin($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }

    // endregion


    // region login

    /**
     * @throws DbException
     */
    public function test_login_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $password = "123456";
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
        $this->getDbService()->pushMockResult([array("email" => $email)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":0/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_wrong_password_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
        $this->getDbService()->pushMockResult([array("email" => $email)]);
        $this->getDbService()->pushMockResult([array("pw_hash" => $pw_hash)]);
        $args = array("email" => $email, "password" => $password . "x", "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_email_not_found_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "123456";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_email_missing_resultcode_is_n1() {
        $password = "123456";
        $this->getDbService()->pushMockResult([]);
        $args = array("password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_email_empty_resultcode_is_n1() {
        $email = "";
        $password = "123456";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $password = "123456";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $password = "123456";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-1/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_password_missing_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_password_empty_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }


    /**
     * @throws DbException
     */
    public function test_login_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
        $this->getDbService()->pushMockResult([array("email" => $email, "pw_hash" => $pw_hash)]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($args, $this->getDbService(), $this->getHttpService());
        $this->assertRegExp('/(.*)"resultcode":-2/', $this->getHttpService()->body);
    }

    // endregion
}
