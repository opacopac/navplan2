<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\IFile;
use Navplan\System\IFileService;


class MockFileService implements IFileService
{
    /* @var $fileGetContentsResult string */
    public $fileGetContentsResult;
    /* @var $filePutContentsResult int */
    public $filePutContentsResult;
    /* @var $fileExistsResult bool */
    public $fileExistsResult;
    /* @var $fopenResult IFile */
    public $fopenResult;
    /* @var $fileGetContentsArgs array */
    public $fileGetContentsArgs;
    /* @var $filePutContentsArgs array */
    public $filePutContentsArgs;
    /* @var $fileExistsArgs array */
    public $fileExistsArgs;
    /* @var $fopenArgs array */
    public $fopenArgs;


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string
    {
        $this->fileGetContentsArgs = [$filename, $use_include_path, $context];
        return $this->fileGetContentsResult;
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = NULL): int
    {
        $this->filePutContentsArgs = [$filename, $data, $flags, $context];
        return $this->filePutContentsResult;
    }


    public function file_exists(string $filename): bool {
        $this->fileExistsArgs = [$filename];
        return $this->fileExistsResult;
    }


    public function fopen(string $filename, string $mode): IFile {
        $this->fopenArgs = [$filename, $mode];
        return $this->fopenResult;
    }
}
