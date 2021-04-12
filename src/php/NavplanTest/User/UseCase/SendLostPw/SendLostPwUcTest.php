<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\User\UseCase\SendLostPw\SendLostPwRequest;
use Navplan\User\UseCase\SendLostPw\SendLostPwUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class UserForgotPwUcTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockUserRepo $userRepoMock;
    private MockMailService $mailServiceMock;
    private SendLostPwUc $sendLostPwUc;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->userRepoMock = $this->config->userRepo;
        $this->mailServiceMock = $this->config->mailService;
        $this->sendLostPwUc = $this->config->getSendLostPwUc();
    }


    public function test_sendLostPw_success_resultcode_is_0() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $request = new SendLostPwRequest($email);

        $response = $this->sendLostPwUc->sendLostPw($request);

        $repoArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals($email, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_not_found_resultcode_is_n2() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = FALSE;
        $request = new SendLostPwRequest($email);

        $response = $this->sendLostPwUc->sendLostPw($request);

        $repoArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $repoArgs[0]);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_empty_resultcode_is_n1() {
        $email = "";
        $request = new SendLostPwRequest($email);

        $response = $this->sendLostPwUc->sendLostPw($request);

        $repoArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_invalid_format_resultcode_is_n1() {
        $email = "www.test.com";
        $request = new SendLostPwRequest($email);

        $response = $this->sendLostPwUc->sendLostPw($request);

        $repoArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendLostPw_email_too_long_resultcode_is_n1() {
        $email = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@navplan.ch";
        $request = new SendLostPwRequest($email);

        $response = $this->sendLostPwUc->sendLostPw($request);

        $repoArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $repoArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }
}
