<?php
declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\IFileService;


class FileServiceMock implements IFileService
{
    private $fileGetContentsResult;
    private $filePutContentsResult;


    public function setResultFileGetContents(string $result) {
        $this->fileGetContentsResult = $result;
    }


    public function setResultFilePutContents(int $result) {
        $this->filePutContentsResult = $result;
    }


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string
    {
        return $this->fileGetContentsResult;
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int
    {
        return $this->filePutContentsResult;
    }
}
