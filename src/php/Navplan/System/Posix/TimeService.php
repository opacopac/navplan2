<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainService\ITimeService;


class TimeService implements ITimeService {
    public function __construct() {
    }


    public function strtotime(string $time): ?int {
        $result = strtotime($time);

        return $result === FALSE ? NULL : $result;
    }


    function currentTimestampSec(): int {
        return time();
    }


    function dateFormat(string $format, null|int $timestamp = null): string {
        return date($format, $timestamp);
    }
}
