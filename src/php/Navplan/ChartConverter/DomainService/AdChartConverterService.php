<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\ChartConverter\DomainModel\AdPngChartRegType;
use Navplan\ChartConverter\DomainModel\Ch1903Chart;
use Navplan\ChartConverter\DomainModel\Ch1903Coordinate;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\ProdNavplanDiContainer;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


class AdChartConverterService implements IAdChartConverterService {
    private const BG_COLOR = 'rgba(0, 0, 0, 0)';

    private static string $adPdfChartDir = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/";
    private static string $adPngChartDir = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/";
    private static string $adChartDir = ProdNavplanDiContainer::AD_CHARTS_DIR;
    private static float $resolutionDpi = 200.0;


    public function __construct(
        private AdChartConverterPersistence $adChartConverterPersistence,
        private IAirportService $airportService,
        private IImageService $imageService,
        private ILoggingService $loggingService
    ) {
    }


    public function convertAllPdfToPng(): void {
        $adPdfCharts = $this->adChartConverterPersistence->readAllAdPdfCharts();

        foreach ($adPdfCharts as $adPdfChart) {
            $this->loggingService->info("converting pdf to png: " . $adPdfChart->pdfFilename . ", page " . $adPdfChart->pdfPage);
            $pdfFilePath = self::$adPdfChartDir . $adPdfChart->pdfFilename;
            $im = $this->imageService->loadPdf(
                $pdfFilePath,
                self::$resolutionDpi,
                $adPdfChart->pdfPage,
                $adPdfChart->pdfRotation
            );

            $pngFilePath = self::$adPngChartDir . $adPdfChart->outPngFilename;
            $im->saveImage($pngFilePath);
        }
    }


    public function renderAllPngToLonLat(): void {
        $adPngCharts = $this->adChartConverterPersistence->readAllAdPngCh1903Charts();

        foreach ($adPngCharts as $adPngChart) {
            $this->loggingService->info("calculating projection: " . $adPngChart->pngFilename);

            $ad = $adPngChart->regType == AdPngChartRegType::ARP
                ? $this->airportService->readByIcao($adPngChart->adIcao)
                : null;
            $pos = ($ad === null)
                ? $adPngChart->pos1Ch1903Coord
                : Ch1903Coordinate::fromPos2d($ad->position);

            $pngFilePath = self::$adPngChartDir . $adPngChart->pngFilename;
            $im = $this->imageService->loadImage($pngFilePath);
            $chart = Ch1903Chart::fromPosAndScale(
                $im,
                $adPngChart->pos1Pixel,
                $pos,
                $adPngChart->chartScale,
                self::$resolutionDpi
            );
            $drawable = $this->calcChartProjection($chart);
            $outFilePath = self::$adChartDir . $adPngChart->outPngFilename;
            $drawable->saveImage($outFilePath);
        }
    }


    private function calcChartProjection(Ch1903Chart $chart): IDrawable {
        $extent = $chart->calcLatLonExtent();
        $midPos = $extent->calcMidPos();
        $lonDiff = $extent->maxPos->longitude - $extent->minPos->longitude;
        $latDiff = $extent->maxPos->latitude - $extent->minPos->latitude;
        $pxPerDeg = $chart->image->getWidth() / $lonDiff;
        $pxWidth = (int) ($chart->image->getWidth());
        $latRad = Angle::convert($midPos->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $pxHeight = (int) round($latDiff * $pxPerDeg / cos($latRad));
        $lonInc = $lonDiff / $pxWidth;
        $latInc = $latDiff / $pxHeight;


        $drawable = $this->imageService->createDrawable($pxWidth, $pxHeight, self::BG_COLOR);
        for ($y = 0; $y < $pxHeight; $y++) {
            for ($x = 0; $x < $pxWidth; $x++) {
                $pos = new Position2d(
                    $extent->minPos->longitude + $x * $lonInc,
                    $extent->minPos->latitude + $y * $latInc
                );
                $chCoord = Ch1903Coordinate::fromPos2d($pos);
                $pixelColor = $chart->getPixelColor($chCoord);
                if ($pixelColor != null) {
                    $drawable->drawPoint2($x, $pxHeight - $y - 1, $pixelColor);
                } else {
                    $drawable->drawPoint($x, $pxHeight - $y - 1, self::BG_COLOR);
                }
            }
            $this->loggingService->info("row " . $y);
        }

        return $drawable;
    }
}
