<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\User\Domain\SendLostPwRequest;
use Navplan\User\UseCase\SendLostPw;
use NavplanTest\System\Mock\MailServiceMock;
use NavplanTest\User\Mocks\UserConfigMock;
use NavplanTest\User\Mocks\UserRepoMock;
use PHPUnit\Framework\TestCase;

// TODO: inject with config
require_once __DIR__ . "/../../../config_test.php";


class UserForgotPwTest extends TestCase {
    /* @var $config UserConfigMock */
    private $config;


    private function getUserRepoMock(): UserRepoMock {
        /* @var $userRepoMock UserRepoMock */
        $userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        return $userRepoMock;
    }


    private function getMailServiceMock(): MailServiceMock {
        /* @var $mailServiceMock MailServiceMock */
        $mailServiceMock = $this->config->getMailService();
        return $mailServiceMock;
    }


    protected function setUp(): void {
        $this->config = new UserConfigMock();
    }


    public function test_sendLostPw_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals($email, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendLostPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $this->getUserRepoMock()->checkEmailExistsResult = FALSE;
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendLostPw_email_empty_resultcode_is_n1() {
        $email = "";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendLostPw_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendLostPw_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }
}
