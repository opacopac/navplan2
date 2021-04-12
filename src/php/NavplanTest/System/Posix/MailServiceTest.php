<?php declare(strict_types=1);

namespace NavplanTest\System\Posix;

use Navplan\System\DomainService\IMailService;
use Navplan\System\Posix\MailService;
use PHPUnit\Framework\TestCase;


class MailServiceTest extends TestCase
{
    private MailService $mailService;


    protected function setUp(): void {
        $this->mailService = MailService::getInstance();
    }


    private function getMailService(): IMailService {
        return $this->mailService;
    }


    public function test_getInstance() {
        $this->assertNotNull($this->getMailService());
    }


    /*public function test_sendEmail_error_with_emtpy_mail() {
        $result = $this->getMailService()->sendEmail('', '', '');
        $this->assertFalse($result);
    }*/
}
