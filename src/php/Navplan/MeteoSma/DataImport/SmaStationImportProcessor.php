<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

use Navplan\MeteoSma\DomainService\IMeteoSmaService;
use Navplan\System\DomainService\IFileService;


class SmaStationImportProcessor {
    public const SMA_STATION_URL = "https://data.geo.admin.ch/ch.meteoschweiz.messnetz-automatisch/ch.meteoschweiz.messnetz-automatisch_de.json";


    public function __construct(
        private IFileService $fileService,
        private IMeteoSmaService $meteoSmaService
    ) {
    }


    public function import(): void {
        $fileText = $this->loadFileFromSma();
        $smaStationList = $this->parseFileToStationList($fileText);
        $this->persistStationList($smaStationList);
    }


    private function loadFileFromSma(): string {
        return $this->fileService->fileGetContents(self::SMA_STATION_URL);
    }


    private function parseFileToStationList(string $fileText): array {
        $stationListJson = json_decode($fileText, true);
        $stationList = SmaStationListParser::fromJson($stationListJson);

        return $stationList;

    }


    private function persistStationList(array $smaStations): void {
        if (count($smaStations) === 0) {
            return;
        }

        $this->meteoSmaService->replaceSmaStations($smaStations);
    }
}
