<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainModel\LogLevel;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\ITimeService;


class LoggingService implements ILoggingService {
    private $logFile = null;


    public function __construct(
        private ITimeService $timeService,
        private int $logLevel,
        ?string $logfileName = null
    ) {
        if ($logfileName != null) {
            $this->logFile = fopen($logfileName, "a");
        }
    }


    public function __destruct() {
        if ($this->logFile != null) {
            fclose($this->logFile);
        }
    }


    public function log(int $logLevel, string $message) {
        if ($logLevel > $this->logLevel) {
            return;
        }

        $logentry = $this->getLogEntry($logLevel, $message);

        if ($this->logFile !== null) {
            fwrite($this->logFile, $logentry);
        } else {
            print $logentry;
        }
    }


    function error(string $message) {
        $this->log(LogLevel::ERROR, $message);
    }


    function warning(string $message) {
        $this->log(LogLevel::WARNING, $message);
    }


    function info(string $message) {
        $this->log(LogLevel::INFO, $message);
    }


    function debug(string $message) {
        $this->log(LogLevel::DEBUG, $message);
    }


    private function getLogEntry(int $logLevel, string $message): string {
        return $this->timeService->dateFormat("Y-m-d H:i:s") . "  "
            . LogLevel::toPaddedString($logLevel) . "  "
            . $message . "\n";
    }
}
