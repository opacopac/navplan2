<?php declare(strict_types=1);

namespace NavplanTest\Traffic\OgnRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Traffic\OgnRepo\OgnRepo;
use NavplanTest\System\Mock\MockFile;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\System\Mock\MockProcService;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Traffic\Mocks\DummyOgnDumpFile12345;
use PHPUnit\Framework\TestCase;


class OgnRepoTest extends TestCase {
    /* @var $fileService MockFileService */
    private $fileService;
    /* @var $procService MockProcService */
    private $procService;
    /* @var $timeService MockTimeService */
    private $timeService;
    /* @var $ognGateway OgnRepo */
    private $ognGateway;


    protected function setUp(): void {
        $systemServiceFactory = new MockSystemServiceFactory();
        $this->fileService = $systemServiceFactory->getFileService();
        $this->procService = $systemServiceFactory->getProcService();
        $this->timeService = $systemServiceFactory->getTimeService();
        $this->ognGateway = new OgnRepo($systemServiceFactory);
    }

    public function test_setFilter() {
        $sessionId = 123;
        $extent = Extent::createFromCoords(7.1, 47.1, 7.9, 47.9);
        $this->fileService->filePutContentsResult = 99;

        $this->ognGateway->setFilter($sessionId, $extent);

        $this->assertRegExp('/' . $sessionId . '/', $this->fileService->filePutContentsArgs[0]);
        $this->assertRegExp('/7.1/', $this->fileService->filePutContentsArgs[1]);
        $this->assertRegExp('/47.1/', $this->fileService->filePutContentsArgs[1]);
        $this->assertRegExp('/7.9/', $this->fileService->filePutContentsArgs[1]);
        $this->assertRegExp('/47.9/', $this->fileService->filePutContentsArgs[1]);
    }


    public function test_isListenerRunning() {
        $sessionId = 123;
        $this->fileService->fileExistsResult = TRUE;

        $result = $this->ognGateway->isListenerRunning($sessionId);

        $this->assertEquals(TRUE, $result);
        $this->assertRegExp('/' . $sessionId . '/', $this->fileService->fileExistsArgs[0]);
    }


    public function test_startListener() {
        $sessionId = 123;
        $this->procService->shellExecResult = "";

        $this->ognGateway->startListener($sessionId);

        $this->assertRegExp('/' . $sessionId . '/', $this->procService->shellExecArgs[0]);
    }


    public function test_readTraffic() {
        $sessionId = 123;
        $file = new MockFile();
        $file->feofCountUntilResultTrue = 1;
        $file->fgetsResult = DummyOgnDumpFile12345::createDumpFileLine1();
        $this->fileService->fileExistsResult = TRUE;
        $this->fileService->fopenResult = $file;
        $this->timeService->strtotimeRelativeDate = DummyOgnDumpFile12345::getDate();

        $trafficList = $this->ognGateway->readTraffic($sessionId);

        $this->assertEquals([], $trafficList);
    }


    public function test_readTraffic_no_dump_files() {
        $sessionId = 123;
        $this->fileService->fileExistsResult = FALSE;

        $trafficList = $this->ognGateway->readTraffic($sessionId);

        $this->assertEquals([], $trafficList);
    }
}
