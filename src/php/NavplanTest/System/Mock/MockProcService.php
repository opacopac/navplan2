<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IProcService;


class MockProcService implements IProcService {
    /* @var $sleepResult ?IFile */
    public $sleepResult;
    /* @var $sleepArgs array */
    public $sleepArgs;

    /* @var $shellExecResult string */
    public $shellExecResult;
    /* @var $shellExecArgs array */
    public $shellExecArgs;


    public function sleep(int $seconds): ?int {
        $this->sleepArgs = [$seconds];
        return $this->sleepResult;
    }


    public function shell_exec(string $cmd): ?string {
        $this->shellExecArgs = [$cmd];
        return $this->shellExecResult;
    }
}
