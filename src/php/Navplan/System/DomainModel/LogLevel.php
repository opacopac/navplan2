<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;

use InvalidArgumentException;


class LogLevel {
    const ERROR = 1;
    const WARNING = 2;
    const INFO = 3;
    const DEBUG = 4;


    public static function toString(int $logLevel): string {
        switch($logLevel) {
            case self::ERROR: return 'ERROR';
            case self::WARNING: return 'WARNING';
            case self::INFO: return 'INFO';
            case self::DEBUG: return 'DEBUG';
            default: throw new InvalidArgumentException('unknown log level: ' . $logLevel);
        }
    }


    public static function toPaddedString(int $logLevel): string {
        return str_pad(LogLevel::toString($logLevel), 7);
    }
}
