<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\IFileService;


class FileServiceMock implements IFileService
{
    private $fileGetContentsResult;
    private $filePutContentsResult;
    private $fileGetContentsFilename;
    private $filePutContentsFilename;
    private $filePutContentsData;


    public function setResultFileGetContents(string $result) {
        $this->fileGetContentsResult = $result;
    }


    public function setResultFilePutContents(int $result) {
        $this->filePutContentsResult = $result;
    }


    public function getFileGetContentsFilename(): string {
        return $this->fileGetContentsFilename;
    }


    public function getFilePutContentsFilename(): string {
        return $this->filePutContentsFilename;
    }


    public function getFilePutContentsData(): string {
        return $this->filePutContentsData;
    }


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string
    {
        $this->fileGetContentsFilename = $filename;
        return $this->fileGetContentsResult;
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = null): int
    {
        $this->filePutContentsFilename = $filename;
        $this->filePutContentsData = $data;
        return $this->filePutContentsResult;
    }
}
