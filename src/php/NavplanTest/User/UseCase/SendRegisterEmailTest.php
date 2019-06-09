<?php declare(strict_types=1);

namespace NavplanTest\Shared;

// TODO => config
require_once __DIR__ . "/../../../config.php";

use Navplan\User\Domain\SendRegisterEmailRequest;
use Navplan\User\UseCase\SendRegisterEmail;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;


class SendRegisterEmailTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;


    private function getUserRepoMock(): MockUserRepo {
        /* @var $userRepoMock MockUserRepo */
        $userRepoMock = $this->config->getUserRepoFactory()->createUserRepo();
        return $userRepoMock;
    }


    private function getMailServiceMock(): MockMailService {
        /* @var $mailServiceMock MockMailService */
        $mailServiceMock = $this->config->getSystemServiceFactory()->getMailService();
        return $mailServiceMock;
    }


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
    }


    public function test_sendRegisterEmail_returns_success_response_and_sends_email() {
        $email = "test@navplan.ch";
        $this->getUserRepoMock()->checkEmailExistsResult = FALSE;
        $request = new SendRegisterEmailRequest($email);
        $response = (new SendRegisterEmail($this->config))->sendRegisterEmail($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(0, $response->code);
        $this->assertEquals($email, $response->email);
        $this->assertEquals("", $response->token);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals($email, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendRegisterEmail_invalid_email_returns_code_m1() {
        $email = "xxx";
        $request = new SendRegisterEmailRequest($email);
        $response = (new SendRegisterEmail($this->config))->sendRegisterEmail($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-1, $response->code);
        $this->assertEquals(NULL, $checkEmailExistsArgs);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }


    public function test_sendRegisterEmail_existing_email_returns_code_m2() {
        $email = "test@navplan.ch";
        $this->getUserRepoMock()->checkEmailExistsResult = TRUE;
        $request = new SendRegisterEmailRequest($email);
        $response = (new SendRegisterEmail($this->config))->sendRegisterEmail($request);
        $checkEmailExistsArgs = $this->getUserRepoMock()->checkEmailExistArgs;

        $this->assertEquals(-2, $response->code);
        $this->assertEquals($email, $checkEmailExistsArgs[0]);
        $this->assertEquals(NULL, $this->getMailServiceMock()->getEmailRecipient());
    }
}
