<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainService;

use Imagick;
use ImagickPixel;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\IcaoChartCh\DomainModel\AdPngChartRegType;
use Navplan\IcaoChartCh\DomainModel\Ch1903Chart;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
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
        private IImageService $imageService,
        private ILoggingService $loggingService
    ) {
    }


    public function convertAllPdfToPng(): void {
        $adPdfCharts = $this->adChartConverterPersistence->readAllAdPdfCharts();

        foreach ($adPdfCharts as $adPdfChart) {
            $this->loggingService->info("converting pdf to png: " . $adPdfChart->pdfFilename . ", page " . $adPdfChart->pdfPage);
            $pdfFilePath = self::$adPdfChartDir . $adPdfChart->pdfFilename;
            $im = $this->loadPdf(
                $pdfFilePath,
                self::$resolutionDpi,
                $adPdfChart->pdfPage,
                $adPdfChart->pdfRotation
            );

            $pngFilePath = self::$adPngChartDir . $adPdfChart->outPngFilename;
            $im->writeImage($pngFilePath);
        }
    }


    public function renderPngToLonLat(): void {
        $adPngCharts = $this->adChartConverterPersistence->readAllAdPngCh1903Charts();

        foreach ($adPngCharts as $adPngChart) {
            if ($adPngChart->regType != AdPngChartRegType::POS1) {
                continue;
            }

            if (!($adPngChart->adIcao == "LSGG" || $adPngChart->adIcao == "LSZR")) {
                continue;
            }


            $this->loggingService->info("reprojecting: " . $adPngChart->pngFilename);

            $pngFilePath = self::$adPngChartDir . $adPngChart->pngFilename;
            $im = $this->imageService->loadImage($pngFilePath);
            $chart = Ch1903Chart::fromPosAndScale(
                $im,
                $adPngChart->pos1Pixel,
                $adPngChart->pos1Ch1903Coord,
                $adPngChart->chartScale,
                self::$resolutionDpi
            );
            $drawable = $this->createChart($chart);
            $outFilePath = self::$adChartDir . $adPngChart->outPngFilename;
            $drawable->saveImage($outFilePath);
        }
    }


    // TODO: wrap
    private function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): Imagick {
        $im = new Imagick();
        $im->setResolution($resolutionDpi, $resolutionDpi);
        $im->setColorspace(Imagick::COLORSPACE_RGB);
        $im->setBackgroundColor(new ImagickPixel('white'));
        $im->readImage($abs_filename . "[" . $page . "]");
        $im->setimagebackgroundcolor("#ffffff");
        $im = $im->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);
        $im->setImageFormat("png");
        //$im->trimImage(0);

        if ($rotation->deg() != 0) {
            $im->rotateImage(new ImagickPixel('#00000000'), $rotation->deg());
        }

        return $im;
    }


    private function createChart(Ch1903Chart $chart): IDrawable {
        $extent = $chart->calcLatLonExtent();
        $midPos = $extent->calcMidPos();
        $lonDiff = abs($extent->maxPos->longitude - $extent->minPos->longitude);
        $latDiff = abs($extent->maxPos->latitude - $extent->minPos->latitude);
        $pxPerDeg = $chart->image->getWidth() / $lonDiff;
        $pxWidth = $chart->image->getWidth();
        $latRad = Angle::convert($midPos->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $pxHeight = (int) round($latDiff * $pxPerDeg / cos($latRad));
        $lonInc = ($extent->maxPos->longitude - $extent->minPos->longitude) / $pxWidth;
        $latInc = ($extent->maxPos->latitude - $extent->minPos->latitude) / $pxHeight;

        $drawable = $this->imageService->createDrawable($pxWidth, $pxHeight, self::BG_COLOR);
        for ($y = 0; $y <= $pxHeight; $y++) {
            for ($x = 0; $x <= $pxWidth; $x++) {
                $pos = new Position2d(
                    $extent->minPos->longitude + $x * $lonInc,
                    $extent->minPos->latitude + $y * $latInc
                );
                $chCoord = Ch1903Coordinate::fromPos2d($pos);
                $pixelColor = $chart->getPixelColor($chCoord);
                if ($pixelColor != null) {
                    $drawable->drawPoint2($x, $y, $pixelColor);
                } else {
                    $drawable->drawPoint($x, $y, self::BG_COLOR);
                }
            }
        }

        return $drawable;
    }
}
