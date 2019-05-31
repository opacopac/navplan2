<?php declare(strict_types=1);

namespace NavplanTest\System;

use Navplan\System\FileService;
use Navplan\System\FileServiceException;
use PHPUnit\Framework\TestCase;


class FileServiceTest extends TestCase {
    private $tmpFile;
    private $tmpFileName;
    private $fileService;


    private function getFileService(): FileService {
        return $this->fileService;
    }


    protected function setUp(): void {
        $this->fileService = FileService::getInstance();
        $this->tmpFile = tmpfile();
        $this->tmpFileName = stream_get_meta_data($this->tmpFile)['uri'];
    }


    protected function tearDown(): void {
        parent::tearDown();

        @fclose($this->tmpFile); // remark: @ prevents exceptions
    }


    // region fileGetContents

    public function test_fileGetContents_reads_file_successfully() {
        $dummyText = "dummy text";
        fwrite($this->tmpFile, $dummyText);
        fseek($this->tmpFile, 0);
        $result = $this->getFileService()->fileGetContents($this->tmpFileName);

        $this->assertEquals($dummyText, $result);
    }


    public function test_fileGetContents_throws_an_exception_if_file_not_present() {
        fclose($this->tmpFile);
        $fileExists = file_exists($this->tmpFileName);

        $this->assertFalse($fileExists);
        $this->expectException(FileServiceException::class);
        $this->getFileService()->fileGetContents($this->tmpFileName);
    }

    // endregion


    // region filePutContents

    public function test_filePutContents_writes_file_successfully() {
        $dummyText = "dummy text";
        $result = $this->getFileService()->filePutContents($this->tmpFileName, $dummyText);

        $this->assertEquals(strlen($dummyText), $result);
    }


    public function test_filePutContents_throws_an_exception_on_error() {
        $this->expectException(FileServiceException::class);
        $this->getFileService()->filePutContents('', 'dummy text');
    }

    // endregion
}
