<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh;

use Navplan\Common\DomainModel\Position2d;

require_once __DIR__ . "/../ConsoleBootstrap.php";


//$icaoChartChFile = __DIR__ . "/luftfahrtkarten-icao_total_50_2056.tif";
$icaoChartChFile = __DIR__ . "/luftfahrtkarten-icao_total_50_2056.png";
$mapTileOutputDir = __DIR__ . "/out/";
$pixelCoord1 = new PixelCoordinate(132, 4246, Ch1903Coordinate::fromPos2d(new Position2d(5.5, 46.0)));
$pixelCoord2 = new PixelCoordinate(7751, 859, Ch1903Coordinate::fromPos2d(new Position2d(10.5, 47.5)));
$icaoChartCh = new IcaoChartCh($icaoChartChFile, $pixelCoord1, $pixelCoord2);
$tileCreator = new IcaoChartChMapTileCreator($icaoChartCh, $mapTileOutputDir);
/*$tileCreator->createTiles(9,  266, 180, 266, 180);
$tileCreator->createTiles(10, 533, 360, 533, 360);
$tileCreator->createTiles(11, 1066, 721, 1066, 721);
$tileCreator->createTiles(12, 2133, 1442, 2133, 1442);
*/
$tileCreator->createTiles(10, 530, 355, 540, 365);
