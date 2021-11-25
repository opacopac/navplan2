<?php declare(strict_types=1);


namespace Navplan\Exporter\FileExportService;

use Navplan\Common\InvalidFormatException;
use Navplan\Common\StringNumberHelper;
use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
use Navplan\Exporter\DomainModel\ExportFile;
use Navplan\Exporter\DomainService\IExportService;
use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\DomainModel\FuelCalc;
use Navplan\System\DomainService\IFileService;
use Navplan\Track\DomainModel\Track;


class FileExportService implements IExportService {
    public function __construct(
        public IFileService $fileService,
        public NavplanPdfBuilder $pdfBuilder,
        public NavplanKmlBuilder $kmlBuilder
    ) {
    }


    /**
     * @throws InvalidFormatException
     */
    public function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc): ExportFile {
        $pdf = $this->pdfBuilder->buildPdf($flightroute, $fuelCalc);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = $this->getPdfFilename($flightroute);
        $tmpFile = $tmpDir . "/" . $fileName;
        $pdf->Output($tmpDirBase . $tmpFile, "F"); // output pdf to temp file

        return new ExportFile(
            $fileName,
            $tmpFile
        );
    }


    /**
     * @throws InvalidFormatException
     */
    function createNavplanKml(Flightroute $flightroute, Track $track): ExportFile {
        $xml = $this->kmlBuilder->buildKml($flightroute, $track);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = $this->getKmlFilename($flightroute, $track);
        $tmpFile = $tmpDir . "/" . $fileName;
        file_put_contents($tmpDirBase . $tmpFile, $xml); // output pdf to temp file

        return new ExportFile(
            $fileName,
            $tmpFile
        );
    }


    /**
     * @throws InvalidFormatException
     */
    private function getPdfFilename(Flightroute $flightroute): string {
        return StringNumberHelper::checkFilename("navplan.pdf"); // TODO
    }


    /**
     * @throws InvalidFormatException
     */
    private function getKmlFilename(Flightroute $flightroute, Track $track): string {
        return StringNumberHelper::checkFilename("navplan.kml"); // TODO
    }
}
