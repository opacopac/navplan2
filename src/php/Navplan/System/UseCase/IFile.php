<?php declare(strict_types=1);

namespace Navplan\System\UseCase;

interface IFile {
    public function fclose(): bool;

    public function fseek(int $offset): int;

    public function fread(int $length): ?string;

    public function fgets(): ?string;

    public function feof(): bool;
}
