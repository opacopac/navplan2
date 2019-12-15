<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DataImport;

use Navplan\MeteoSma\DataImport\SmaStationImportProcessor;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use NavplanTest\MeteoSma\Mocks\DummySmaStationList1;
use NavplanTest\MeteoSma\Mocks\MockMeteoRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\System\Mock\MockFileService;
use PHPUnit\Framework\TestCase;


class SmaStationImportProcessorTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $importer SmaStationImportProcessor */
    private $importer;
    /* @var $mockFileService MockFileService */
    private $mockFileService;
    /* @var $mockMeteoRepo MockMeteoRepo */
    private $mockMeteoRepo;


    function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->mockFileService = $this->config->getSystemServiceFactory()->getFileService();
        $this->mockMeteoRepo = $this->config->getMeteoRepo();
        $this->importer = new SmaStationImportProcessor($this->config);
    }


    function test_import() {
        $this->mockFileService->fileGetContentsResult = DummySmaStationList1::createImportJsonString();

        $this->importer->import();

        $this->assertStringContainsString(SmaStationImportProcessor::SMA_STATION_URL, $this->mockFileService->fileGetContentsArgs[0]);
        $this->assertEquals(2, count($this->mockMeteoRepo->replaceSmaStationsArgs));
        $this->assertEquals(DummySmaStation1::create(), $this->mockMeteoRepo->replaceSmaStationsArgs[0]);
        $this->assertEquals(DummySmaStation2::create(), $this->mockMeteoRepo->replaceSmaStationsArgs[1]);
    }
}
