<?php namespace Navplan\Shared;
require_once __DIR__ . "/../NavplanHelper.php";


class MailService
{
    const NAVPLAN_EMAIL_FROM = "info@navplan.ch";

    public static function sendEmail(string $emailTo, string $subject, string $message): bool {
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: ' . self::NAVPLAN_EMAIL_FROM . "\r\n";
        $headers .= 'Reply-To: ' . self::NAVPLAN_EMAIL_FROM . "\r\n";

        return mail($emailTo, $subject, $message, $headers);
    }
}
