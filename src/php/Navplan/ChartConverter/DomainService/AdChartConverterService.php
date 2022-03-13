<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

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
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


class AdChartConverterService implements IAdChartConverterService {
    private const BG_COLOR = 'rgba(0, 0, 0, 0)';

    private static string $adPdfChartDir = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/";
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
        $drawableAndExtent = $this->transformAdChart($adChart);
        $outFilePath = self::$adChartDir . $adChart->outPngFilename;
        $drawableAndExtent[0]->saveImage($outFilePath);
        $this->adChartConverterPersistence->writeExtent($adChart->id, $drawableAndExtent[1]);
    }


    private function transformAdChart(AdPdfChart $adChart): array {
        $this->loggingService->info("converting chart: " . $adChart->pdfFilename . ", page " . $adChart->pdfPage);
        $pdfFilePath = self::$adPdfChartDir . $adChart->pdfFilename;
        $im = $this->imageService->loadPdf(
            $pdfFilePath,
            self::$resolutionDpi,
            $adChart->pdfPage,
            $adChart->pdfRotation
        );

        $ad = $adChart->regType == AdPngChartRegType::ARP
            ? $this->airportService->readByIcao($adChart->adIcao)
            : null;
        $pos = ($ad === null)
            ? $adChart->pos1Ch1903Coord
            : Ch1903Coordinate::fromPos2d($ad->position);

        $chart = Ch1903Chart::fromPosAndScale(
            $im,
            $adChart->pos1Pixel,
            $pos,
            $adChart->chartScale,
            self::$resolutionDpi
        );

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
