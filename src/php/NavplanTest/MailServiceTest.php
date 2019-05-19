<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Navplan\Shared\IMailService;
use Navplan\Shared\MailService;


class MailServiceTest extends TestCase
{
    private $mailService;


    protected function setUp(): void
    {
        parent::setUp();
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
