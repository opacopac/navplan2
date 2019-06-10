<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\User\Domain\SendLostPwRequest;
use Navplan\User\UseCase\SendLostPw;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;

class UserForgotPwTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $userRepoMock MockUserRepo */
    private $userRepoMock;
    /* @var $mailServiceMock MockMailService */
    private $mailServiceMock;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        $this->mailServiceMock = $this->config->getSystemServiceFactory()->getMailService();
    }


    public function test_sendLostPw_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->userRepoMock->checkEmailExistArgs;

        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals($email, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = FALSE;
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->userRepoMock->checkEmailExistArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_empty_resultcode_is_n1() {
        $email = "";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->userRepoMock->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->userRepoMock->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $request = new SendLostPwRequest($email);
        $response = (new SendLostPw($this->config))->sendLostPw($request);
        $repoArgs = $this->userRepoMock->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }
}
