<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\ConsoleService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use Navplan\IcaoChartCh\DomainModel\IcaoChartCh;
use Navplan\IcaoChartCh\DomainModel\XyPair;
use Navplan\IcaoChartCh\DomainService\IcaoChartChMapTileRenderer;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
//$icaoChartChFile = __DIR__ . "/luftfahrtkarten-icao_total_50_2056.tif";
$icaoChartChFile = __DIR__ . "/luftfahrtkarten-icao_total_50_2056.png";
$mapTileOutputDir = __DIR__ . "/out/";
$pixelPos1 = new XyPair(135, 4246);
$chCoord1 = Ch1903Coordinate::fromPos2d(new Position2d(5.5, 46.0));
$pixelPos2 = new XyPair(7751, 858);
$chCoord2 = Ch1903Coordinate::fromPos2d(new Position2d(10.5, 47.5));
$chartImage = $diContainer->getImageService()->loadImage($icaoChartChFile);
$icaoChartCh = new IcaoChartCh($chartImage, $pixelPos1, $chCoord1, $pixelPos2, $chCoord2);
$tileCreator = new IcaoChartChMapTileRenderer($icaoChartCh, $mapTileOutputDir, $diContainer->getImageService(), $diContainer->getScreenLogger());
//$tileCreator->createTiles(10, 530, 355, 540, 365);
//$tileCreator->createZoomLevelTiles(6);

for ($i = 0; $i <= 11; $i++) {
    $tileCreator->createZoomLevelTiles($i);
}
