<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\ConsoleService;

use Navplan\IcaoChartCh\DomainModel\Ch1903Chart;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use Navplan\IcaoChartCh\DomainModel\XyPair;
use Navplan\IcaoChartCh\DomainService\IcaoChartChMapTileRenderer;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

/*$icaoChartChFile = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/luftfahrtkarten-icao_total_50_2056.png";
$mapTileOutputDir = ProdNavplanDiContainer::MAP_TILES_DIR . "icao_ch_aero/";
$pixelPos1 = new XyPair(135, 4246);
$chCoord1 = Ch1903Coordinate::fromPos2d(new Position2d(5.5, 46.0));
$pixelPos2 = new XyPair(7751, 858);
$chCoord2 = Ch1903Coordinate::fromPos2d(new Position2d(10.5, 47.5));*/

$icaoChartChFile = ProdNavplanDiContainer::DATA_IMPORT_DIR . "swisstopo_charts_ch/segelflugkarte_total_30_2056.png";
$mapTileOutputDir = ProdNavplanDiContainer::MAP_TILES_DIR . "icao_ch_glider/";
$pixelPos1 = new XyPair(333, 7399);
$chCoord1 = new Ch1903Coordinate(490000, 80000);
$pixelPos2 = new XyPair(12000, 65);
$chCoord2 = new Ch1903Coordinate(840000, 300000);

$chartImage = $diContainer->getImageService()->loadImage($icaoChartChFile);
$icaoChartCh = Ch1903Chart::fromPos1AndPos2($chartImage, $pixelPos1, $chCoord1, $pixelPos2, $chCoord2);
$tileCreator = new IcaoChartChMapTileRenderer($icaoChartCh, $mapTileOutputDir, $diContainer->getImageService(), $diContainer->getScreenLogger());

//$tileCreator->createTiles(11, 1070, 716, 1070, 716);
//$tileCreator->createZoomLevelTiles(6);

for ($i = 0; $i <= 12; $i++) {
    $tileCreator->createZoomLevelTiles($i);
}
