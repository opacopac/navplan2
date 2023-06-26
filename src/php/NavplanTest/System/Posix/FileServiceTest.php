<?php declare(strict_types=1);

namespace NavplanTest\System\Posix;

use Navplan\System\Domain\Model\FileServiceException;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Posix\FileService;
use PHPUnit\Framework\TestCase;


class FileServiceTest extends TestCase {
    private $tmpFile;
    private FileService $tmpFileName;
    private IFileService $fileService;


    protected function setUp(): void {
        $this->fileService = new FileService(null); // TODO
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
        $result = $this->fileService->fileGetContents($this->tmpFileName);

        $this->assertEquals($dummyText, $result);
    }


    public function test_fileGetContents_throws_an_exception_if_file_not_present() {
        fclose($this->tmpFile);
        $fileExists = file_exists($this->tmpFileName);

        $this->assertFalse($fileExists);
        $this->expectException(FileServiceException::class);
        $this->fileService->fileGetContents($this->tmpFileName);
    }

    // endregion


    // region filePutContents

    public function test_filePutContents_writes_file_successfully() {
        $dummyText = "dummy text";
        $result = $this->fileService->filePutContents($this->tmpFileName, $dummyText);

        $this->assertEquals(strlen($dummyText), $result);
    }


    public function test_filePutContents_throws_an_exception_on_error() {
        $this->expectException(FileServiceException::class);
        $this->fileService->filePutContents('', 'dummy text');
    }

    // endregion
}
