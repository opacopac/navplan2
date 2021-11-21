<?php declare(strict_types=1);


namespace Navplan\Exporter\FileExportService;

use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
use Navplan\Exporter\DomainService\IExportService;
use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Flightroute\Domain\FuelCalc;
use Navplan\System\DomainService\IFileService;
use Navplan\Track\DomainModel\Track;


class FileExportService implements IExportService {
    public function __construct(
        public IFileService $fileService,
        public NavplanPdfBuilder $pdfBuilder,
        public NavplanKmlBuilder $kmlBuilder
    ) {
    }


    public function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc, string $fileName): string {
        $pdf = $this->pdfBuilder->buildPdf($flightroute, $fuelCalc);
        $tmpFile = $this->fileService->createFileInTempDir($fileName);
        $pdf->Output($tmpFile, "F"); // output pdf to temp file

        return $tmpFile;
    }


    function createNavplanKml(Flightroute $flightroute, Track $track, string $fileName): string {
        $xml = $this->kmlBuilder->buildKml($flightroute, $track, $fileName);
        $tmpFile = $this->fileService->createFileInTempDir($fileName);
        file_put_contents($tmpFile, $xml); // output pdf to temp file

        return $tmpFile;
    }
}
