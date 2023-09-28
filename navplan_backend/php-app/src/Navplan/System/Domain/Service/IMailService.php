<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


interface IMailService {
    function sendEmail(string $emailTo, string $subject, string $message): bool;
}
