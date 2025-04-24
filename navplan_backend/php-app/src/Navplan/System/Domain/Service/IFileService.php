<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;

use Navplan\System\Domain\Model\IFile;


interface IFileService {
    function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string;

    function filePutContents(string $filename, $data, int $flags = 0, $context = null): int;

    function file_exists(string $filename): bool;

    function fopen(string $filename, string $mode): ?IFile;

    function getTempDirBase(): string;

    function createTempDir(): string;

    function glob(string $directory, int $flags): array|false;

    function moveUploadedFile(string $from, string $to): bool;
}
