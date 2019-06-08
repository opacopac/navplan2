<?php declare(strict_types=1);

namespace NavplanTest\System;

use PHPUnit\Framework\TestCase;
use Navplan\System\UseCase\IMailService;
use Navplan\System\Posix\MailService;


class MailServiceTest extends TestCase
{
    private $mailService;


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
