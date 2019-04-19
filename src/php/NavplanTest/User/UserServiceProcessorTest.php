<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use InvalidArgumentException;
use Navplan\User\UserServiceProcessor;
use NavplanTest\DbServiceMock;
use NavplanTest\MailServiceMock;
use PHPUnit\Framework\TestCase;

class UserServiceProcessorTest extends TestCase {
    private $dbService;
    private $mailService;


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->mailService = MailServiceMock::getInstance();
    }


    public function test_processRequest_login_gets_called() {
        $postVars = array("action" => "login");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_autologin_gets_called() {
        $postVars = array("action" => "autologin");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_sendRegisterEmail_gets_called() {
        $postVars = array("action" => "sendregisteremail", "email" => "");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_register_gets_called() {
        $postVars = array("action" => "register", "token" => "", "password" => "");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_sendlostpwemail_gets_called() {
        $postVars = array("action" => "sendlostpwemail");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_resetpassword_gets_called() {
        $postVars = array("action" => "resetpassword");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_updatepassword_gets_called() {
        $postVars = array("action" => "updatepassword", "token" => "", "oldpassword" => "", "newpassword" => "");
        $this->expectOutputRegex('/error/');
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }


    public function test_processRequest_unknown_action_throws_exception() {
        $postVars = array("action" => "xxx");
        $this->expectException(InvalidArgumentException::class);
        UserServiceProcessor::processRequest($postVars, $this->mailService, $this->dbService);
    }
}
