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
use Navplan\ProdNavplanDiContainer;
use Navplan\System\DomainModel\Color;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


class AdChartConverterService implements IAdChartConverterService {
    private const AD_PDF_CHART_DIR = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/vfrm/";
    private const AD_CHART_DIR = ProdNavplanDiContainer::AD_CHARTS_DIR;
    private const RESOLUTION_DPI = 200.0;


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
            $outFilePath = self::AD_CHART_DIR . "TMP_" . $adChart->outPngFilename;
            $im->saveImage($outFilePath);
            $this->loggingService->info("saved temp file " . $adChart->outPngFilename);
        } else {
            $drawableAndExtent = $this->transformAdChart($adChart, $im);
            $outFilePath = self::AD_CHART_DIR . $adChart->outPngFilename;
            $drawableAndExtent[0]->saveImage($outFilePath);
            $this->adChartConverterPersistence->writeExtent($adChart->id, $drawableAndExtent[1]);
            $this->loggingService->info("done");
        }
    }


    private function loadPdf(AdPdfChart $adChart): IImage  {
        $pdfFilePath = self::AD_PDF_CHART_DIR . $adChart->pdfFilename;
        return $this->imageService->loadPdf(
            $pdfFilePath,
            self::RESOLUTION_DPI,
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
                    self::RESOLUTION_DPI
                );
                break;
            case AdPngChartRegType::POS1:
                $chart = Ch1903Chart::fromPosAndScale(
                    $im,
                    $adChart->pos1Pixel,
                    $adChart->pos1Ch1903Coord,
                    $adChart->chartScale,
                    self::RESOLUTION_DPI
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


        $drawable = $this->imageService->createDrawable($pxWidth, $pxHeight);
        for ($y = 0; $y < $pxHeight; $y++) {
            for ($x = 0; $x < $pxWidth; $x++) {
                $chCoord = Ch1903Coordinate::fromLonLat(
                    $extent->minPos->longitude + $x * $lonInc,
                    $extent->minPos->latitude + $y * $latInc
                );

                $pixelColor = $chart->getPixelColor($chCoord);
                if ($pixelColor != null) {
                    $drawable->drawPoint($x, $pxHeight - $y - 1, $pixelColor);
                } else {
                    $drawable->drawPoint($x, $pxHeight - $y - 1, Color::TRANSPARENT);
                }
            }
        }

        return $drawable;
    }
}
