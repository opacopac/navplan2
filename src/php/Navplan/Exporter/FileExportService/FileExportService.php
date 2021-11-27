<?php declare(strict_types=1);


namespace Navplan\Exporter\FileExportService;

use Navplan\Common\InvalidFormatException;
use Navplan\Exporter\Builder\NavplanFplBuilder;
use Navplan\Exporter\Builder\NavplanGpxBuilder;
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
        public NavplanKmlBuilder $kmlBuilder,
        public NavplanGpxBuilder $gpxBuilder,
        public NavplanFplBuilder $fplBuilder
    ) {
    }


    /**
     * @throws InvalidFormatException
     */
    public function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc): ExportFile {
        $pdf = $this->pdfBuilder->buildPdf($flightroute, $fuelCalc);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = "naplan.pdf"; // TODO
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
    public function createNavplanKml(Flightroute $flightroute, Track $track): ExportFile {
        $xml = $this->kmlBuilder->buildKml($flightroute, $track);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = "navplan.kml"; // TODO
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
    public function createNavplanGpx(Flightroute $flightroute, Track $track): ExportFile {
        $xml = $this->gpxBuilder->buildGpx($flightroute, $track);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = "navplan.kml"; // TODO
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
    public function createNavplanFpl(Flightroute $flightroute): ExportFile {
        $xml = $this->fplBuilder->buildFpl($flightroute);
        $tmpDirBase = $this->fileService->getTempDirBase();
        $tmpDir = $this->fileService->createTempDir();
        $fileName = "navplan.fpl"; // TODO
        $tmpFile = $tmpDir . "/" . $fileName;
        file_put_contents($tmpDirBase . $tmpFile, $xml); // output pdf to temp file

        return new ExportFile(
            $fileName,
            $tmpFile
        );
    }
}
