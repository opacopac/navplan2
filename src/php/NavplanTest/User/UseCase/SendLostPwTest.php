<?php declare(strict_types=1);

namespace NavplanTest\User\UseCase;

use Navplan\User\Domain\SendLostPwRequest;
use Navplan\User\UseCase\SendLostPw;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserConfig;
use NavplanTest\User\Mocks\MockUserRepo;
use PHPUnit\Framework\TestCase;

// TODO: inject with config
require_once __DIR__ . "/../../../config_test.php";


class UserForgotPwTest extends TestCase {
    /* @var $config MockUserConfig */
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
        $this->config = new MockUserConfig();
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
