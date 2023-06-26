<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


interface ILoggingService {
    function log(int $logLevel, string $message);

    function error(string $message);

    function warning(string $message);

    function info(string $message);

    function debug(string $message);
}
