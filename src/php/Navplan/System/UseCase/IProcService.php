<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface IProcService {
    public function sleep(int $seconds): ?int;

    public function shell_exec(string $cmd): ?string;
}