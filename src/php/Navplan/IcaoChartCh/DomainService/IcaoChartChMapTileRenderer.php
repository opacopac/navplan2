<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\IcaoChartCh\DomainModel\Ch1903Chart;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use Navplan\IcaoChartCh\DomainModel\MapTileCoordinate;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


class IcaoChartChMapTileRenderer {
    private const TILE_SIZE_PX = 256;
    private const BG_COLOR = 'rgba(0, 0, 0, 0)';


    public function __construct(
        private Ch1903Chart     $icaoChart,
        private string          $mapTilesOutputDir,
        private IImageService   $imageService,
        private ILoggingService $loggingService
    ) {
    }


    public function createZoomLevelTiles(int $zoom) {
        $extent = $this->icaoChart->calcLatLonExtent();
        $posTL = new Position2d($extent->minPos->longitude, $extent->maxPos->latitude);
        $posBR = new Position2d($extent->maxPos->longitude, $extent->minPos->latitude);
        $tileTL = MapTileCoordinate::fromPosition($posTL, $zoom);
        $tileBR = MapTileCoordinate::fromPosition($posBR, $zoom);

        $this->createTiles(
            $zoom,
            min($tileTL->xtile, $tileBR->xtile),
            min($tileTL->ytile, $tileBR->ytile),
            max($tileTL->xtile, $tileBR->xtile),
            max($tileTL->ytile, $tileBR->ytile)
        );
    }


    public function createTiles(
        int $zoom,
        int $minTileX,
        int $minTileY,
        int $maxTileX,
        int $maxTileY
    ): void {
        for ($x = $minTileX; $x <= $maxTileX; $x++) {
            for ($y = $minTileY; $y <= $maxTileY; $y++) {
                $this->loggingService->info("rendering tile x: $x, y: $y z: $zoom");
                $im = $this->createSingleTile($zoom, $x, $y);
                $this->writeFile($im, $x, $y, $zoom);
            }
        }
    }


    private function createSingleTile(
        int $zoom,
        int $tileX,
        int $tileY
    ): IDrawable {
        $tileCoordMin = new MapTileCoordinate($tileX, $tileY, $zoom);
        $tileCoordMax = new MapTileCoordinate($tileX + 1, $tileY + 1, $zoom);
        $minLon = $tileCoordMin->toPosition()->longitude;
        $minLat = $tileCoordMin->toPosition()->latitude;
        $maxLon = $tileCoordMax->toPosition()->longitude;
        $maxLat = $tileCoordMax->toPosition()->latitude;
        $lonInc = ($maxLon - $minLon) / self::TILE_SIZE_PX;
        $latInc = ($maxLat - $minLat) / self::TILE_SIZE_PX;

        $drawable = $this->imageService->createDrawable(self::TILE_SIZE_PX, self::TILE_SIZE_PX, self::BG_COLOR);
        for ($y = 0; $y <= self::TILE_SIZE_PX; $y++) {
            for ($x = 0; $x <= self::TILE_SIZE_PX; $x++) {
                $pos = new Position2d(
                    $minLon + $x * $lonInc,
                    $minLat + $y * $latInc
                );
                $chCoord = Ch1903Coordinate::fromPos2d($pos);
                $pixelColor = $this->icaoChart->getPixelColor($chCoord);
                if ($pixelColor != null) {
                    $drawable->drawPoint2($x, $y, $pixelColor);
                } else {
                    $drawable->drawPoint($x, $y, self::BG_COLOR);
                }
            }
        }

        return $drawable;
    }


    private function writeFile(IDrawable $imDraw, int $x, int $y, int $zoom): void {
        $path = $this->mapTilesOutputDir . $zoom . "/" . $x;
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $fileName = $y . ".png";
        $imDraw->saveImage($path . "/" . $fileName);
    }
}
