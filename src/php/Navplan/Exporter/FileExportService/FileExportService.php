<?php declare(strict_types=1);


namespace Navplan\Exporter\FileExportService;

use Navplan\Common\InvalidFormatException;
use Navplan\Common\StringNumberHelper;
use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
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
    public function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc, string $fileName): string {
        $pdf = $this->pdfBuilder->buildPdf($flightroute, $fuelCalc);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = StringNumberHelper::checkFilename($fileName);
        $tmpFile = $tmpDir . "/" . $fileName;
        $pdf->Output($tmpDirBase . $tmpFile, "F"); // output pdf to temp file

        return $tmpFile;
    }


    /**
     * @throws InvalidFormatException
     */
    function createNavplanKml(Flightroute $flightroute, Track $track, string $fileName): string {
        $xml = $this->kmlBuilder->buildKml($flightroute, $track, $fileName);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = StringNumberHelper::checkFilename($fileName);
        $tmpFile = $tmpDir . "/" . $fileName;
        file_put_contents($tmpDirBase . $tmpFile, $xml); // output pdf to temp file

        return $tmpFile;
    }
}
