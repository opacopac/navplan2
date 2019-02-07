<?php declare(strict_types=1);

namespace NavplanTest\Shared;

require_once __DIR__ . "/../../config.php";

use Navplan\User\UserHelper;
use Navplan\User\UserRegister;
use NavplanTest\DbServiceMock;
use NavplanTest\MailServiceMock;
use PHPUnit\Framework\TestCase;


class UserRegisterTest extends TestCase {
    private $dbService;
    private $mailService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getMailService(): MailServiceMock {
        return $this->mailService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->mailService = MailServiceMock::getInstance();
    }


    // region sendRegisterEmail

    public function test_sendRegisterEmail_returns_success_response() {
        $email = "test@navplan.ch";
        $args = array("email" => $email);
        $this->getDbService()->pushMockResult([]);
        UserRegister::sendRegisterEmail($this->getDbService(), $args, $this->getMailService());

        $this->expectOutputRegex('/(.*)"resultcode":0/');
        $this->expectOutputRegex('/(.*)"email":' . $email . '/');
        $this->expectOutputRegex('/(.*)"token":""/');
    }


    public function test_sendRegisterEmail_success_sends_an_email() {
        $email = "test@navplan.ch";
        $args = array("email" => $email);
        $this->getDbService()->pushMockResult([]);
        UserRegister::sendRegisterEmail($this->getDbService(), $args, $this->getMailService());

        $this->expectOutputRegex('/(.*)"resultcode":0/');
        $this->assertEquals($email, $this->getMailService()->getEmailRecipient());
    }


    public function test_sendRegisterEmail_invalid_email_returns_code_m1() {
        $email = "xxx";
        $args = array("email" => $email);
        UserRegister::sendRegisterEmail($this->getDbService(), $args, $this->getMailService());

        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_sendRegisterEmail_existing_email_returns_code_m2() {
        $email = "test@navplan.ch";
        $args = array("email" => $email);
        $this->getDbService()->pushMockResult([array("id" => 12345)]);
        UserRegister::sendRegisterEmail($this->getDbService(), $args, $this->getMailService());

        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }

    // endregion


    // region register

    public function test_register_returns_success_response() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $password = "123456";
        $rememberme = "1";
        $args = array("token" => $token, "password" => $password, "rememberme" => $rememberme);
        $this->getDbService()->pushMockResult([]);
        UserRegister::register($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":0/');
        $this->expectOutputRegex('/(.*)"email":' . $email . '/');
        $this->expectOutputRegex('/(.*)"token":".{10,}"/');
    }


    public function test_register_creates_a_new_user() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $password = "123456";
        $rememberme = "1";
        $args = array("token" => $token, "password" => $password, "rememberme" => $rememberme);
        $this->getDbService()->pushMockResult([]);
        UserRegister::register($this->getDbService(), $args);

        $this->assertContains("INSERT INTO users", $this->getDbService()->lastQuery);
        $this->expectOutputRegex('/(.*)"resultcode":0/');
    }


    public function test_register_invalid_pw_returns_code_m1() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $password = "1234";
        $rememberme = "1";
        $args = array("token" => $token, "password" => $password, "rememberme" => $rememberme);
        UserRegister::register($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-1/');
    }


    public function test_register_invalid_token_returns_code_m2() {
        $token = "";
        $password = "123456";
        $rememberme = "1";
        $args = array("token" => $token, "password" => $password, "rememberme" => $rememberme);
        UserRegister::register($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-2/');
    }


    public function test_register_existing_email_returns_code_m3() {
        $email = "test@navplan.ch";
        $token = UserHelper::createToken($email, FALSE);
        $password = "123456";
        $rememberme = "1";
        $args = array("token" => $token, "password" => $password, "rememberme" => $rememberme);
        $this->getDbService()->pushMockResult([array("id" => 12345)]);
        UserRegister::register($this->getDbService(), $args);

        $this->expectOutputRegex('/(.*)"resultcode":-3/');
    }

    // endregion
}
