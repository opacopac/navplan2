<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainService\IProcService;


class ProcService implements IProcService {
    private static $instance = NULL;


    public static function getInstance(): IProcService {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    private function __construct() {
    }


    public function sleep(int $seconds): ?int {
        $result = sleep($seconds);

        return $result === FALSE ? NULL : $result;
    }


    public function shell_exec(string $cmd): ?string {
        return shell_exec($cmd);
    }
}
