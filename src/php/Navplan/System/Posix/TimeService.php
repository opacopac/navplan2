<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainService\ITimeService;


class TimeService implements ITimeService {
    private static $instance = NULL;


    public static function getInstance(): ITimeService {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    private function __construct() {
    }


    public function strtotime(string $time): ?int {
        $result = strtotime($time);

        return $result === FALSE ? NULL : $result;
    }
}
