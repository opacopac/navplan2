<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/services/DbService.php";
include_once __DIR__ . "/../php/services/LoggingService.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSorter.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSortItemTypeAirport.php";
include_once __DIR__ . "/zoom_level_sorter/ZoomLevelSortItemTypeNavaid.php";

$conn = DbService::openDb();

// navaids
LoggingService::echoLineToBrowser("sorting navaids...");
$navaidItemType = new ZoomLevelSortItemTypeNavaid($conn);
ZoomLevelSorter::sort($navaidItemType);

// airports
LoggingService::echoLineToBrowser("sorting airports...");
$airportItemType = new ZoomLevelSortItemTypeAirport($conn);
ZoomLevelSorter::sort($airportItemType);
