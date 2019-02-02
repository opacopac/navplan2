<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\IMailService;


class MailServiceMock implements IMailService
{
    public static function getInstance(): IMailService {
        return new MailServiceMock();
    }


    private function __construct() {
    }


    public function sendEmail(string $emailTo, string $subject, string $message): bool {
        return TRUE;
    }
}
