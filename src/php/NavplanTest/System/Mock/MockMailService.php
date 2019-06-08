<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IMailService;


class MockMailService implements IMailService {
    private $emailRecipient;


    public function getEmailRecipient(): ?string {
        return $this->emailRecipient;
    }


    public function __construct() {
        $this->emailRecipient = NULL;
    }


    public function sendEmail(string $emailTo, string $subject, string $message): bool {
        $this->emailRecipient = $emailTo;
        return TRUE;
    }
}
