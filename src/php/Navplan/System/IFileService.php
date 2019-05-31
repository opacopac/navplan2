<?php declare(strict_types=1);

namespace Navplan\System;

interface IFileService {
    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string;

    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int;
}
