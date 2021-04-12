<?php declare(strict_types=1);

namespace Navplan\System\DomainService;

use Navplan\System\DomainModel\IFile;


interface IFileService {
    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string;

    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int;

    public function file_exists(string $filename): bool;

    public function fopen(string $filename, string $mode): ?IFile;
}
