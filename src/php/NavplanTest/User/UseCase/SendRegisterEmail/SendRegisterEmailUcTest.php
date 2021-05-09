<?php declare(strict_types=1);

namespace NavplanTest\Common;

use Navplan\User\UseCase\SendRegisterEmail\SendRegisterEmailRequest;
use Navplan\User\UseCase\SendRegisterEmail\SendRegisterEmailUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class SendRegisterEmailUcTest extends TestCase {
    private MockUserRepo $userRepoMock;
    private MockMailService $mailServiceMock;
    private SendRegisterEmailUc $sendRegisterEmailUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->userRepoMock = $config->userRepo;
        $this->mailServiceMock = $config->mailService;
        $this->sendRegisterEmailUc = $config->getSendRegisterEmailUc();
    }


    public function test_sendRegisterEmail_returns_success_response_and_sends_email() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = FALSE;
        $request = new SendRegisterEmailRequest($email);

        $response = $this->sendRegisterEmailUc->sendRegisterEmail($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $response->email);
        $this->assertEquals("", $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendRegisterEmail_invalid_email_returns_code_m1() {
        $email = "xxx";
        $request = new SendRegisterEmailRequest($email);

        $response = $this->sendRegisterEmailUc->sendRegisterEmail($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }


    public function test_sendRegisterEmail_existing_email_returns_code_m2() {
        $email = "test@navplan.ch";
        $this->userRepoMock->checkEmailExistsResult = TRUE;
        $request = new SendRegisterEmailRequest($email);

        $response = $this->sendRegisterEmailUc->sendRegisterEmail($request);

        $checkEmailExistsArgs = $this->userRepoMock->checkEmailExistArgs;
        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $this->mailServiceMock->getEmailRecipient());
    }
}
