<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;

use InvalidArgumentException;


class LogLevel {
    const ERROR = 1;
    const WARNING = 2;
    const INFO = 3;
    const DEBUG = 4;


    public static function fromString(string $logLevelStr): int {
        return match (strtoupper($logLevelStr)) {
            'ERROR' => self::ERROR,
            'WARNING' => self::WARNING,
            'INFO' => self::INFO,
            'DEBUG' => self::DEBUG,
            default => throw new InvalidArgumentException('unknown log level: ' . $logLevelStr),
        };
    }


    public static function toString(int $logLevelInt): string {
        return match ($logLevelInt) {
            self::ERROR => 'ERROR',
            self::WARNING => 'WARNING',
            self::INFO => 'INFO',
            self::DEBUG => 'DEBUG',
            default => throw new InvalidArgumentException('unknown log level: ' . $logLevelInt),
        };
    }


    public static function toPaddedString(int $logLevel): string {
        return str_pad(LogLevel::toString($logLevel), 7);
    }
}
