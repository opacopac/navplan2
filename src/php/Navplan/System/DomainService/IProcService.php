<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface IProcService {
    function sleep(int $seconds): ?int;

    function shell_exec(string $cmd): string|false|null;

    function startBackgroundProcess(
        $command,
        $stdin = null,
        $redirectStdout = null,
        $redirectStderr = null,
        $cwd = null,
        $env = null,
        $other_options = null
    );
}
