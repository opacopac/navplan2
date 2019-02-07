<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\IMailService;


class MailServiceMock implements IMailService {
    private $emailRecipient;


    public function getEmailRecipient(): ?string {
        return $this->emailRecipient;
    }


    public static function getInstance(): IMailService {
        return new MailServiceMock();
    }


    private function __construct() {
        $this->emailRecipient = NULL;
    }


    public function sendEmail(string $emailTo, string $subject, string $message): bool {
        $this->emailRecipient = $emailTo;
        return TRUE;
    }
}
