<?php namespace NavplanTest;

use Navplan\Shared\MailService;


class MailServiceMock extends MailService
{
    public static function getInstance(): MailService {
        return new MailServiceMock();
    }


    private function __construct()
    {
    }


    public function sendEmail(string $emailTo, string $subject, string $message): bool
    {
        return TRUE;
    }
}
