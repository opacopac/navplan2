<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DataImport;

use Navplan\MeteoSma\DataImport\SmaStationImportProcessor;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use NavplanTest\MeteoSma\Mocks\DummySmaStationList1;
use NavplanTest\MeteoSma\Mocks\MockMeteoSmaRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockFileService;
use PHPUnit\Framework\TestCase;


class SmaStationImportProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private SmaStationImportProcessor $importer;
    private MockFileService $mockFileService;
    private MockMeteoSmaRepo $mockMeteoRepo;


    function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->mockFileService = $this->config->fileService;
        $this->mockMeteoRepo = $this->config->meteoService;
        $this->importer = new SmaStationImportProcessor($this->mockFileService, $this->mockMeteoRepo);
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
