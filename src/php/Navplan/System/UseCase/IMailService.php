<?php declare(strict_types=1);

namespace Navplan\System\UseCase;

interface IMailService
{
    public function sendEmail(string $emailTo, string $subject, string $message): bool;
}
