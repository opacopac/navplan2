<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\Domain\Model\LogLevel;
use Navplan\System\Domain\Service\ILoggingService;


class MockLoggingService implements ILoggingService
{
    public ?string $lastLogMessage = null;
    public ?int $lastLogLevel = null;

    public function log(int $logLevel, string $message)
    {
        $this->lastLogLevel = $logLevel;
        $this->lastLogMessage = $message;
    }


    public function error(string $message)
    {
        $this->log(LogLevel::ERROR, $message);
    }


    public function warning(string $message)
    {
        $this->log(LogLevel::WARNING, $message);
    }


    public function info(string $message)
    {
        $this->log(LogLevel::INFO, $message);
    }


    public function debug(string $message)
    {
        $this->log(LogLevel::DEBUG, $message);
    }
}
