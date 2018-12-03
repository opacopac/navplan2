<?php namespace NavplanTest\User;
require_once __DIR__ . "/../../config.php";

use Navplan\User\UserForgotPw;
use Navplan\Shared\DbException;
use Navplan\User\UserHelper;
use NavplanTest\DbTestCase;
use NavplanTest\MailServiceMock;


class UserForgotPwTest extends DbTestCase
{
    // region forgotPw (step 1)

    /**
     * @throws DbException
     */
    public function test_forgotPw_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $conn = $this->getDbConnectionFromResultList([array("email" => $email)]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    /**
     * @throws DbException
     */
    public function test_forgotPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_forgotPw_email_missing_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("wrongkey" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_forgotPw_email_empty_resultcode_is_n1() {
        $email = "";
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_forgotPw_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_forgotPw_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($conn, $args, $mailService);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    // endregion
    
    
    // region resetPw (step 2)

    /**
     * @throws DbException
     */
    public function test_resetPw_success_resultcode_is_0_and_token_is_valid_for_email() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([array("email" => $email)]);
        $conn->addMockResult(TRUE);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $output = $this->getActualOutput();
        preg_match('/"token":"(.+)"/', $output, $matches);
        $tokenEmail = UserHelper::escapeAuthenticatedEmailOrNull($conn, $matches[1]);
        $this->assertEquals($email, $tokenEmail);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_token_missing_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("wrongtoken" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_token_invalid_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = "xxx" . UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_missing_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("token" => $token, "wrongpassword" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_too_short_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "12345";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $token = UserHelper::createToken($email, FALSE);
        $conn = $this->getDbConnectionFromResultList([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($conn, $args);
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    // endregion
}
