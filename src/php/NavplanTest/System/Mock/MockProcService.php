<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\DomainService\IProcService;


class MockProcService implements IProcService {
    public ?int $sleepResult;
    public array $sleepArgs;

    public string $shellExecResult;
    public array $shellExecArgs;


    public function sleep(int $seconds): ?int {
        $this->sleepArgs = [$seconds];
        return $this->sleepResult;
    }


    public function shell_exec(string $cmd): ?string {
        $this->shellExecArgs = [$cmd];
        return $this->shellExecResult;
    }
}
