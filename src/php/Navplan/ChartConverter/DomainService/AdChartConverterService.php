<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use InvalidArgumentException;
use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\ChartConverter\DomainModel\AdPngChartRegType;
use Navplan\ChartConverter\DomainModel\Ch1903Chart;
use Navplan\ChartConverter\DomainModel\Ch1903Coordinate;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\ProdNavplanDiContainer;
use Navplan\System\DomainModel\Color;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


class AdChartConverterService implements IAdChartConverterService {
    private static string $adPdfChartDir = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/vfrm/";
    private static string $adChartDir = ProdNavplanDiContainer::AD_CHARTS_DIR;
    private static float $resolutionDpi = 200.0;


    public function __construct(
        private AdChartConverterPersistence $adChartConverterPersistence,
        private IAirportService $airportService,
        private IImageService $imageService,
        private ILoggingService $loggingService
    ) {
    }


    public function convertAdChart(int $id): void {
        $adChart = $this->adChartConverterPersistence->readAdPdfChart($id);
        $this->convertSingleChart($adChart);
    }


    public function convertAllAdCharts(): void {
        $adCharts = $this->adChartConverterPersistence->readAllAdPdfCharts();
        foreach ($adCharts as $adChart) {
            $this->convertSingleChart($adChart);
        }
    }


    private function convertSingleChart(AdPdfChart $adChart): void {
        $this->loggingService->info("converting chart: " . $adChart->pdfFilename . ", page " . $adChart->pdfPage);
        $im = $this->loadPdf($adChart);

        if ($adChart->pos1Pixel == null) {
            $outFilePath = self::$adChartDir . "TMP_" . $adChart->outPngFilename;
            $im->saveImage($outFilePath);
        } else {
            $drawableAndExtent = $this->transformAdChart($adChart, $im);
            $outFilePath = self::$adChartDir . $adChart->outPngFilename;
            $drawableAndExtent[0]->saveImage($outFilePath);
            $this->adChartConverterPersistence->writeExtent($adChart->id, $drawableAndExtent[1]);
        }
    }


    private function loadPdf(AdPdfChart $adChart): IImage  {
        $pdfFilePath = self::$adPdfChartDir . $adChart->pdfFilename;
        return $this->imageService->loadPdf(
            $pdfFilePath,
            self::$resolutionDpi,
            $adChart->pdfPage,
            $adChart->pdfRotation
        );
    }


    private function transformAdChart(AdPdfChart $adChart, IImage $im): array {
        switch ($adChart->regType) {
            case AdPngChartRegType::ARP:
                $ad = $this->airportService->readByIcao($adChart->adIcao);
                $chart = Ch1903Chart::fromPosAndScale(
                    $im,
                    $adChart->pos1Pixel,
                    Ch1903Coordinate::fromPos2d($ad->position),
                    $adChart->chartScale,
                    self::$resolutionDpi
                );
                break;
            case AdPngChartRegType::POS1:
                $chart = Ch1903Chart::fromPosAndScale(
                    $im,
                    $adChart->pos1Pixel,
                    $adChart->pos1Ch1903Coord,
                    $adChart->chartScale,
                    self::$resolutionDpi
                );
                break;
            case AdPngChartRegType::POS1POS2:
                $chart = Ch1903Chart::fromPos1Pos2Rot(
                    $im,
                    $adChart->pos1Pixel,
                    $adChart->pos1Ch1903Coord,
                    $adChart->pos2Pixel,
                    $adChart->pos2Ch1903Coord,
                );
                break;
            default:
                throw new InvalidArgumentException('unknown registration type ' . $adChart->regType);
        }

        $extent = $chart->calcLatLonExtent();
        $drawable = $this->calcChartProjection($chart, $extent);

        return [$drawable, $extent];
    }


    private function calcChartProjection(Ch1903Chart $chart, Extent2d $extent): IDrawable {
        $midPos = $extent->calcMidPos();
        $lonDiff = $extent->maxPos->longitude - $extent->minPos->longitude;
        $latDiff = $extent->maxPos->latitude - $extent->minPos->latitude;
        $pxPerDeg = $chart->image->getWidth() / $lonDiff;
        $pxWidth = $chart->image->getWidth();
        $latRad = Angle::convert($midPos->latitude, AngleUnit::DEG, AngleUnit::RAD);
        $pxHeight = (int) round($latDiff * $pxPerDeg / cos($latRad));
        $lonInc = $lonDiff / $pxWidth;
        $latInc = $latDiff / $pxHeight;


        $drawable = $this->imageService->createDrawable($pxWidth, $pxHeight, null); //self::BG_COLOR);
        $tim1 = 0; $tim2 = 0; $tim3 = 0; $tim4 = 0;
        for ($y = 0; $y < $pxHeight; $y++) {
            for ($x = 0; $x < $pxWidth; $x++) {
                $starttime = microtime(true);
                $pos = new Position2d(
                    $extent->minPos->longitude + $x * $lonInc,
                    $extent->minPos->latitude + $y * $latInc
                );
                $tim1 += microtime(true) - $starttime;

                $starttime = microtime(true);
                $chCoord = Ch1903Coordinate::fromPos2d($pos);
                $tim2 += microtime(true) - $starttime;

                $starttime = microtime(true);
                $pixelColor = $chart->getPixelColor($chCoord);
                $tim3 += microtime(true) - $starttime;

                $starttime = microtime(true);
                if ($pixelColor != null) {
                    $drawable->drawPoint($x, $pxHeight - $y - 1, $pixelColor);
                } else {
                    $drawable->drawPoint($x, $pxHeight - $y - 1, Color::BLACK);
                }
                $tim4 += microtime(true) - $starttime;
            }

            if ($y % 100 === 0) {
                $this->loggingService->info("row " . $y);
                $this->loggingService->info("t1 $tim1");
                $this->loggingService->info("t2 $tim2");
                $this->loggingService->info("t3 $tim3");
                $this->loggingService->info("t4 $tim4");
            }
        }

        return $drawable;
    }
}
