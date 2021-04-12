<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface IMailService
{
    public function sendEmail(string $emailTo, string $subject, string $message): bool;
}
