<?php namespace NavplanTest\User;
require_once __DIR__ . "/../../config.php";

use Navplan\User\UserForgotPw;
use Navplan\Shared\DbException;
use Navplan\User\UserHelper;
use NavplanTest\DbServiceMock;
use NavplanTest\MailServiceMock;
use PHPUnit\Framework\TestCase;


class UserForgotPwTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
    }


    // region forgotPw (step 1)

    public function test_forgotPw_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $this->getDbService()->pushMockResult([array("email" => $email)]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    public function test_forgotPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    public function test_forgotPw_email_missing_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $this->getDbService()->pushMockResult([]);
        $args = array("wrongkey" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_forgotPw_email_empty_resultcode_is_n1() {
        $email = "";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_forgotPw_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_forgotPw_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $this->getDbService()->pushMockResult([]);
        $args = array("email" => $email);
        $mailService = MailServiceMock::getInstance();

        UserForgotPw::sendLostPwEmail($args, $mailService, $this->getDbService());
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
        $this->getDbService()->pushMockResult([array("email" => $email)]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $output = $this->getActualOutput();
        preg_match('/"token":"(.+)"/', $output, $matches);
        $tokenEmail = UserHelper::escapeAuthenticatedEmailOrNull2($this->getDbService(), $matches[1]);
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
        $this->getDbService()->pushMockResult([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_token_missing_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $this->getDbService()->pushMockResult([]);
        $args = array("wrongtoken" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_token_invalid_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = "xxx" . UserHelper::createToken($email, FALSE);
        $this->getDbService()->pushMockResult([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_missing_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "123456";
        $token = UserHelper::createToken($email, FALSE);
        $this->getDbService()->pushMockResult([]);
        $args = array("token" => $token, "wrongpassword" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_too_short_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "12345";
        $token = UserHelper::createToken($email, FALSE);
        $this->getDbService()->pushMockResult([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    /**
     * @throws DbException
     */
    public function test_resetPw_password_too_long_resultcode_is_n1() {
        $email = "test@navplan.ch";
        $password = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
        $token = UserHelper::createToken($email, FALSE);
        $this->getDbService()->pushMockResult([]);
        $args = array("token" => $token, "password" => $password);

        UserForgotPw::resetPassword($args, $this->getDbService());
        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    // endregion
}
