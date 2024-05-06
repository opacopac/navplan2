<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;


class MailService implements IMailService
{
    const NAVPLAN_EMAIL_FROM = "info@navplan.ch"; // TODO: config


    public function __construct(
        private ILoggingService $loggingService
    )
    {
    }


    public function sendEmail(string $emailTo, string $subject, string $message): bool
    {
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: ' . self::NAVPLAN_EMAIL_FROM . "\r\n";
        $headers .= 'Reply-To: ' . self::NAVPLAN_EMAIL_FROM . "\r\n";

        $this->logSendingMail($emailTo, $subject, $message, $headers);

        $result = mail($emailTo, $subject, $message, $headers);

        if ($result === false) {
            $this->logMailError($emailTo, $subject, $message, $headers);
        }

        return $result;
    }


    private function logSendingMail(string $emailTo, string $subject, string $message, string $headers): void
    {
        $this->loggingService->info('sending email to ' . $emailTo . ' with subject ' . $subject);
        $this->loggingService->debug('email headers: ' . $headers);
        $this->loggingService->debug('email message: ' . $message);
    }


    private function logMailError(string $emailTo, string $subject, string $message, string $headers): void
    {
        $this->loggingService->error('error sending email to ' . $emailTo . ' with subject ' . $subject);
        $this->loggingService->debug('email headers: ' . $headers);
        $this->loggingService->debug('email message: ' . $message);
    }
}
