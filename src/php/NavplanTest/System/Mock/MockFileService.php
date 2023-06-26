<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MockFileService implements IFileService {
    public string $fileGetContentsResult;
    public array $fileGetContentsArgs;

    public int $filePutContentsResult;
    public array $filePutContentsArgs;

    public bool $fileExistsResult;
    public array $fileExistsArgs;

    public ?IFile $fopenResult;
    public array $fopenArgs;


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string {
        $this->fileGetContentsArgs = [$filename, $use_include_path, $context];
        return $this->fileGetContentsResult;
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = NULL): int {
        $this->filePutContentsArgs = [$filename, $data, $flags, $context];
        return $this->filePutContentsResult;
    }


    public function file_exists(string $filename): bool {
        $this->fileExistsArgs = [$filename];
        return $this->fileExistsResult;
    }


    public function fopen(string $filename, string $mode): ?IFile {
        $this->fopenArgs = [$filename, $mode];
        return $this->fopenResult;
    }
}
