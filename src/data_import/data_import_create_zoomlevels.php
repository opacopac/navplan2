<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Db/MySqlDb/DbService.php";
include_once __DIR__ . "/../php/Navplan/Shared/LoggingServiceOld.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSorter.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSortItemTypeAirport.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSortItemTypeNavaid.php";

use Navplan\Db\MySqlDb\DbService;
use Navplan\Shared\LoggingServiceOld;


$conn = DbService::openDb();

// navaids
LoggingServiceOld::echoLineToBrowser("sorting navaids...");
$navaidItemType = new ZoomLevelSortItemTypeNavaid($conn);
ZoomLevelSorter::sort($navaidItemType);

// airports
LoggingServiceOld::echoLineToBrowser("sorting airports...");
$airportItemType = new ZoomLevelSortItemTypeAirport($conn);
ZoomLevelSorter::sort($airportItemType);
