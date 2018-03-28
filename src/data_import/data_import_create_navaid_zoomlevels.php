<?php
//ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/services/GeoService.php";
include_once __DIR__ . "/../php/services/DbService.php";
include_once __DIR__ . "/../php/services/LoggingService.php";

const MAX_ZOOM = 14;
const MAX_COUNT_DB_RECORDS = 1000;
const NAVAID_TYPE_PRIO = array(
    "DVOR-DME" => 9,
    "DVORTAC" => 8,
    "VOR-DME" => 7,
    "VORTAC" => 6,
    "DVOR" => 5,
    "VOR" => 4,
    "NDB" => 3,
    "TACAN" => 2,
    "DME" => 1
);


$conn = DbService::openDb();

// TODO: temp
$query =  "UPDATE openaip_navaids2 SET zoommin = NULL";
DbService::execCUDQuery($conn, $query);


$lastGeoHash = NULL;
$loopCount = 0;
do {
    // TODO: temp
    $loopCount++;
    if ($loopCount > 20)
        die;

    $isOpenStart = true;
    if ($lastGeoHash === NULL) {
        $isOpenStart = false;
    }

    // read batch from DB
    $query =  "SELECT ";
    $query .= "  id, type, latitude, longitude, geohash";
    $query .= " FROM openaip_navaids2";
    $query .= " WHERE";
    $query .= "  zoommin IS NULL";
    $query .= $lastGeoHash !== NULL ? " AND geohash > '" . $lastGeoHash . "'" : "";
    $query .= " ORDER BY geohash ASC";
    $query .= " LIMIT " . MAX_COUNT_DB_RECORDS;
    $result = DbService::execMultiResultQuery($conn, $query);
    LoggingService::echoLineToBrowser($query);
    LoggingService::echoLineToBrowser("loading " . $result->num_rows . " items...");

    $navaidBuffer = [];
    while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $navaidBuffer[] = $rs;
    }

    if ($result->num_rows < MAX_COUNT_DB_RECORDS) {
        $lastGeoHash = NULL; // loop around
        $isOpenEnd = false;
    } else {
        $lastGeoHash = $navaidBuffer[count($navaidBuffer) - 1]["geohash"];
        $isOpenEnd = true;
    }

    // recursively set min zoom
    setBranchMinZoom($navaidBuffer, 0, count($navaidBuffer), $isOpenStart, $isOpenEnd,"");

    // group ids by zoomlevel
    $itemIdsByZoom = array();
    for ($i = 0; $i < count($navaidBuffer); $i++) {
        if (array_key_exists("zoommin", $navaidBuffer[$i])) {
            $id = $navaidBuffer[$i]["id"];
            $zoomMin = $navaidBuffer[$i]["zoommin"];
            if (!array_key_exists($zoomMin, $itemIdsByZoom)) {
                $itemIdsByZoom[$zoomMin] = [];
            }
            $itemIdsByZoom[$zoomMin][] = $id;
        }
    }

    // set last item zoom min = 0
    if (!$isOpenStart && !$isOpenEnd && count($navaidBuffer) == 1) {
        $itemIdsByZoom[0][] = $navaidBuffer[0]["id"];
    }

    // write to db
    foreach ($itemIdsByZoom as $zoomMin => $idList) {
        $query =  "UPDATE openaip_navaids2";
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";
        DbService::execCUDQuery($conn, $query);
        LoggingService::echoLineToBrowser($query);
    }

} while (count($navaidBuffer) > 0);

LoggingService::echoLineToBrowser("done.");


function getCommonPrefixPointers($itemList, $startPos, $maxCount, $commonPrefix) {
    $commonPrefixLen = strlen($commonPrefix);
    $pos = $startPos;
    $count = 0;

    for ($i = $startPos; $i < $startPos + $maxCount; $i++) {
        $itemPrefix = substr($itemList[$i]["geohash"], 0, $commonPrefixLen);

        if ($count === 0) {
            if ($itemPrefix === $commonPrefix) {
                $pos = $i;
                $count++;
            }
        } else {
            if ($itemPrefix === $commonPrefix) {
                $count++;
            } else {
                break;
            }
        }
    }

    return [$pos, $count];
}


function setBranchMinZoom(&$branchItems, $startPos, $count, $isOpenStart, $isOpenEnd, $commonPrefix) {
    list($startPos2, $count2) = getCommonPrefixPointers($branchItems, $startPos, $count, $commonPrefix);

/*    for ($i = 0; $i < $count2; $i++) {
        print $branchItems[$startPos2 + $i]["geohash"] . "<br>\n";
    }*/

    if ($count2 <= 1) {
        return;
    }

    $isOpenStart2 = true;
    if (!$isOpenStart || ($startPos2 > $startPos)) {
        $isOpenStart2 = false;
    }

    $isOpenEnd2 = true;
    if (!$isOpenEnd || (($startPos2 + $count2) < ($startPos + $count))) {
        $isOpenEnd2 = false;
    }

    // TODO: tmp
    $color = 255 - round(200 / 15 * strlen($commonPrefix));
    print "<table style='background-color:rgb($color, $color, $color)'>\n";
    print "<tr><td colspan='2'>COMMON PREFIX2: '" . $commonPrefix . "'</td></tr>\n";
    print "<tr><td colspan='2'>START:" . $startPos2 . " LEN:" . $count2 . " OPENSTART:" . $isOpenStart2 . " OPENEND:" . $isOpenEnd2 . "</td></tr>\n";
    print "<tr><td>&nbsp;</td><td>\n";

    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "a");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "b");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "c");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "d");

    print "</td></tr>\n";

    if (!$isOpenStart2 && !$isOpenEnd2) {
        print "<tr><td>sorting:</td><td>\n";

        if ($count2 > 1) {
            $sortItems = [];
            for ($i = 0; $i < $count2; $i++) {
                if (!array_key_exists("zoommin", $branchItems[$startPos2 + $i])) {
                    $sortItems[] = &$branchItems[$startPos2 + $i];
                }
            }
            usort($sortItems, "importanceComparer");
            $zoomMin = strlen($commonPrefix);

            print "<tr><td colspan='2'>set zoom " . $zoomMin . " for items:";
            for ($i = 1; $i < count($sortItems); $i++) {
                $sortItems[$i]["zoommin"] = $zoomMin;
                print " " . $sortItems[$i]["id"];
            }
            print "</td></tr>\n";
        }

        // TEMP: get best item
        for ($i = 0; $i < $count2; $i++) {
            $item = $branchItems[$startPos2 + $i];
            if (!array_key_exists("zoommin", $item)) {
                print "<tr><td colspan='2'>best item: " . $item["id"] . "</td></tr>\n";
            }
        }
    }

    print "</table>\n";
}


function importanceComparer($b, $a) {
    $aTypePrio = NAVAID_TYPE_PRIO[$a["type"]];
    $bTypePrio = NAVAID_TYPE_PRIO[$b["type"]];
    return $aTypePrio - $bTypePrio;
}
