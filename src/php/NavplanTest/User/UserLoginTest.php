<?php namespace NavplanTest\Shared;
require_once __DIR__ . "/../../config.php";

use Navplan\Shared\DbException;
use Navplan\Shared\DbResult;
use Navplan\User\UserHelper;
use Navplan\User\UserLogin;
use NavplanTest\DbTestCase;


class UserLoginTest extends DbTestCase
{
    // region autoLogin

    public function test_autoLogin_success_resultcode_is_0() {
        $conn = $this->getDbConnection(TRUE);
        $token = UserHelper::createToken("test@navplan.ch", false);
        $args = array("token" => $token);

        UserLogin::autoLogin($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    public function test_autoLogin_invalid_token_resultcode_is_n1() {
        $conn = $this->getDbConnection(TRUE);
        $args = array("token" => "invalid.dummy.token");

        UserLogin::autoLogin($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":\-1/');
    }


    public function test_autoLogin_no_token_resultcode_is_n1() {
        $conn = $this->getDbConnection(TRUE);
        $args = array("wrongarg" => "dummy");

        UserLogin::autoLogin($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":\-1/');
    }


    public function test_autoLogin_expired_token_resultcode_is_n1() {
        $conn = $this->getDbConnection(TRUE);
        $expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array("token" => $expiredToken);

        UserLogin::autoLogin($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":\-1/');
    }

    // endregion


    // region login

    /**
     * @throws DbException
     */
    public function test_login_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $password = "123456";
        $pw_hash = crypt($password);
        $conn = $this->getDbConnectionFromResultList([array("email" => $email)]);
        $this->addMockResultsFromResultList($conn, [array("pw_hash" => $pw_hash)]);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    /**
     * @throws DbException
     */
    public function test_login_wrong_password_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $pw_hash = crypt($password);
        $conn = $this->getDbConnectionFromResultList([array("email" => $email)]);
        $this->addMockResultsFromResultList($conn, [array("pw_hash" => $pw_hash)]);
        $args = array("email" => $email, "password" => $password . "x", "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_login_email_not_found_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "123456";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_login_email_missing_resultcode_is_n1() {
        $password = "123456";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_login_email_empty_resultcode_is_n1() {
        $email = "";
        $password = "123456";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_login_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $password = "123456";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_login_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $password = "123456";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_login_password_missing_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_login_password_empty_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "";
        $expectedResult = $this->getDbResult([]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_login_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $pw_hash = crypt($password);
        $expectedResult = $this->getDbResult([array("email" => $email, "pw_hash" => $pw_hash)]);
        $conn = $this->getDbConnection($expectedResult);
        $args = array("email" => $email, "password" => $password, "rememberme" => "0");

        UserLogin::login($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }

    // endregion
}
