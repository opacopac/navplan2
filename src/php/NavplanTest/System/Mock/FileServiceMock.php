<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\IFileService;


class FileServiceMock implements IFileService
{
    private $fileGetContentsResult;
    private $filePutContentsResult;
    private $fileGetContentsFilename;
    private $fileGetContentsContext;
    private $filePutContentsFilename;
    private $filePutContentsData;
    private $filePutContentsContext;


    public function setResultFileGetContents(string $result) {
        $this->fileGetContentsResult = $result;
    }


    public function setResultFilePutContents(int $result) {
        $this->filePutContentsResult = $result;
    }


    public function getFileGetContentsFilename(): string {
        return $this->fileGetContentsFilename;
    }


    public function getFileGetContentsContext() {
        return $this->fileGetContentsContext;
    }


    public function getFilePutContentsFilename(): string {
        return $this->filePutContentsFilename;
    }


    public function getFilePutContentsData(): string {
        return $this->filePutContentsData;
    }


    public function getFilePutContentsContext() {
        return $this->filePutContentsContext;
    }


    public function fileGetContents(string $filename, bool $use_include_path = FALSE, $context = NULL): string
    {
        $this->fileGetContentsFilename = $filename;
        $this->fileGetContentsContext = $context;
        return $this->fileGetContentsResult;
    }


    public function filePutContents(string $filename, $data, int $flags = 0, $context = NULL): int
    {
        $this->filePutContentsFilename = $filename;
        $this->filePutContentsData = $data;
        $this->filePutContentsContext = $context;
        return $this->filePutContentsResult;
    }
}
