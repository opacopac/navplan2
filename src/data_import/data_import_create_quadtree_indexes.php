<?php
include_once __DIR__ . "/../php/services/DbService.php";
include_once __DIR__ . "/../php/quadtree/QuadTree.php";
include_once __DIR__ . "/../php/quadtree/IndexItemBase.php";
include_once __DIR__ . "/../php/quadtree/IndexItemNavaid.php";
include_once __DIR__ . "/../php/quadtree/IndexItemAirport.php";
include_once __DIR__ . "/../php/search/SearchItemAirport.php";
include_once __DIR__ . "/../php/search/SearchItemNavaid.php";


const MAX_DB_SELECT_ITEMS_ITEMS = 1000;

$getAirportDbItemsFunction = function($conn, $lastId, $maxResults) {
    return IndexItemAirport::loadItems($conn, $lastId, $maxResults);
};

$getNavaidDbItemsFunction = function($conn, $lastId, $maxResults) {
    return IndexItemNavaid::loadItems($conn, $lastId, $maxResults);
};

$conn = DbService::openDb();
createIndex($conn, $getNavaidDbItemsFunction, SearchItemNavaid::FILENAME_NAVAID_INDEX);
createIndex($conn, $getAirportDbItemsFunction, SearchItemAirport::FILENAME_AIRPORT_INDEX);
$conn->close();


function createIndex($conn, $getDbItemsFunction, $indexFilename) {
    print "creating index '" . $indexFilename . "'\n";

    $iterationCount = 0;
    $itemCount = 0;
    $lastId = 0;
    $quadTree = new QuadTree(0, -180, -90, 180, 90);

    do {
        print "iteration count: " . $iterationCount . "\n";
        print "last id: " . $lastId . "\n";
        print "memory usage: " . memory_get_usage() . "\n";
        print "db item count: " . $itemCount . "\n";
        print "tree item count: " . $quadTree->countItems() . "\n";
        print "tree node count: " . $quadTree->countNodes() . "\n";
        print "bytes: " . QuadTree::getByteLength($quadTree) . "\n";
        print "\n";

        $iterationCount++;
        $dbItems = $getDbItemsFunction($conn, $lastId, MAX_DB_SELECT_ITEMS_ITEMS);
        $itemCount += count($dbItems);

        foreach ($dbItems as $item) {
            $quadTree->insertItem($item);
            $lastId = $item->id + 1;
        }

        // circuit breaker
        if ($iterationCount > 1000)
            die;

    } while (count($dbItems) > 0);

    // sort
    $quadTree->sortByImportance();

    // write index to file
    $file = fopen($indexFilename, "w");
    QuadTree::writeIndexToFile($file, $quadTree);
    fclose($file);
}
