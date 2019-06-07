<?php declare(strict_types=1);

namespace Navplan\System;

interface IFile {
    public function fclose();

    public function fseek(int $offset): int;

    public function fread(int $length): string;
}
