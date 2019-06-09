<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IFile;
use Navplan\System\UseCase\IFileService;


class MockFileService implements IFileService {
    /* @var $fileGetContentsResult string */
    public $fileGetContentsResult;
    /* @var $fileGetContentsArgs array */
    public $fileGetContentsArgs;

    /* @var $filePutContentsResult int */
    public $filePutContentsResult;
    /* @var $filePutContentsArgs array */
    public $filePutContentsArgs;

    /* @var $fileExistsResult bool */
    public $fileExistsResult;
    /* @var $fileExistsArgs array */
    public $fileExistsArgs;

    /* @var $fopenResult ?IFile */
    public $fopenResult;
    /* @var $fopenArgs array */
    public $fopenArgs;


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
