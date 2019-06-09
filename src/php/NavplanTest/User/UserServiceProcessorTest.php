<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use InvalidArgumentException;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UserServiceProcessor;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\User\Mocks\MockUserConfig;
use PHPUnit\Framework\TestCase;


class UserServiceProcessorTest extends TestCase {
    private $config;


    private function getConfig(): IUserConfig {
        return $this->config;
    }


    private function getHttpService(): MockHttpService {
        /* @var $service MockHttpService */
        $service = $this->getConfig()->getSystemServiceFactory()->getHttpService();
        return $service;
    }


    protected function setUp(): void {
        $this->config = new MockUserConfig();
    }


    public function test_processRequest_login_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_LOGIN,
            "email" => "",
            "password" => "",
            "rememberme" => "0"
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_autologin_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_AUTOLOGIN,
            "token" => ""
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_sendRegisterEmail_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_SEND_REGISTER_MAIL,
            "email" => ""
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_register_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_REGISTER,
            "token" => "",
            "password" => "",
            "rememberme" => "0"
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_sendlostpwemail_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_SEND_LOST_PW,
            "email" => ""
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_resetpassword_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_RESET_PW,
            "token" => "",
            "password" => "",
            "rememberme" => "0"
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_updatepassword_gets_called() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => UserServiceProcessor::ACTION_UPDATE_PW,
            "token" => "",
            "oldpassword" => "",
            "newpassword" => ""
        );
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_unknown_action_throws_exception() {
        $postVars = array(
            UserServiceProcessor::ARG_ACTION => "xxx"
        );
        $this->expectException(InvalidArgumentException::class);
        UserServiceProcessor::processRequest($postVars, $this->getConfig());
    }
}
