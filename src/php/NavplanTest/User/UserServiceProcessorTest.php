<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use InvalidArgumentException;
use Navplan\User\UserServiceProcessor;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use NavplanTest\MailServiceMock;
use PHPUnit\Framework\TestCase;

class UserServiceProcessorTest extends TestCase {
    private $dbService;
    private $mailService;
    private $httpService;


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->mailService = MailServiceMock::getInstance();
        $this->httpService = new HttpResponseServiceMock();
    }


    public function test_processRequest_login_gets_called() {
        $postVars = array("action" => "login");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_autologin_gets_called() {
        $postVars = array("action" => "autologin");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_sendRegisterEmail_gets_called() {
        $postVars = array("action" => "sendregisteremail", "email" => "");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_register_gets_called() {
        $postVars = array("action" => "register", "token" => "", "password" => "");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_sendlostpwemail_gets_called() {
        $postVars = array("action" => "sendlostpwemail");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_resetpassword_gets_called() {
        $postVars = array("action" => "resetpassword");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_updatepassword_gets_called() {
        $postVars = array("action" => "updatepassword", "token" => "", "oldpassword" => "", "newpassword" => "");
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
        $this->assertRegExp('/error/', $this->getHttpService()->body);
    }


    public function test_processRequest_unknown_action_throws_exception() {
        $postVars = array("action" => "xxx");
        $this->expectException(InvalidArgumentException::class);
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService, $this->getHttpService());
    }
}
