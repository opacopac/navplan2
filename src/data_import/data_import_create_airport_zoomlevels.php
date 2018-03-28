<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/services/GeoService.php";
include_once __DIR__ . "/../php/services/DbService.php";
include_once __DIR__ . "/../php/services/LoggingService.php";

const MAX_ZOOM = 14;
const MAX_COUNT_DB_RECORDS = 1000;


const AIRPORT_TYPE_PRIO = array(
    "INTL_APT" => 11,
    "AF_MIL_CIVIL" => 10,
    "APT" => 9,
    "AD_MIL" => 8,
    "AF_CIVIL" => 7,
    "GLIDING" => 6,
    "LIGHT_AIRCRAFT" => 5,
    "HELI_CIVIL" => 4,
    "HELI_MIL" => 3,
    "AF_WATER" => 2,
    "AD_CLOSED" => 1,
);


$conn = DbService::openDb();

// TODO: temp
$query =  "UPDATE openaip_airports2 SET zoommin = NULL";
DbService::execCUDQuery($conn, $query);


$lastGeoHash = NULL;
$loopCount = 0;
do {
    // TODO: temp
    if ($loopCount > 5)
        die;

    $isOpenStart = true;
    if ($lastGeoHash === NULL) {
        $isOpenStart = false;
    }

    // read batch from DB
    $query = " SELECT apt.id, apt.type, apt.latitude, apt.longitude, apt.icao, apt.geohash,";
    $query .= " (SELECT COUNT(rwy.id) FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id) AS rwycount,";
    $query .= " (SELECT rwy.length FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id ORDER BY rwy.length DESC LIMIT 1) AS rwylen";
    $query .= " FROM openaip_airports2 apt";
    $query .= " WHERE";
    $query .= "  apt.zoommin IS NULL";
    $query .= $lastGeoHash !== NULL ? " AND apt.geohash > '" . $lastGeoHash . "'" : "";
    $query .= " ORDER BY apt.geohash ASC";
    $query .= " LIMIT " . MAX_COUNT_DB_RECORDS;
    $result = DbService::execMultiResultQuery($conn, $query);
    //LoggingService::echoLineToBrowser($query);
    LoggingService::echoLineToBrowser("loading " . $result->num_rows . " items" . ($lastGeoHash !== NULL ? " starting from " . $lastGeoHash : ""));

    $airportBuffer = [];
    while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $airportBuffer[] = $rs;
    }

    if ($result->num_rows < MAX_COUNT_DB_RECORDS) {
        $loopCount++;
        $lastGeoHash = NULL; // loop around
        $isOpenEnd = false;
    } else {
        $lastGeoHash = $airportBuffer[count($airportBuffer) - 1]["geohash"];
        $isOpenEnd = true;
    }

    // recursively set min zoom
    setBranchMinZoom($airportBuffer, 0, count($airportBuffer), $isOpenStart, $isOpenEnd,"");

    // group ids by zoomlevel
    $itemIdsByZoom = array();
    for ($i = 0; $i < count($airportBuffer); $i++) {
        if (array_key_exists("zoommin", $airportBuffer[$i])) {
            $id = $airportBuffer[$i]["id"];
            $zoomMin = $airportBuffer[$i]["zoommin"];
            if (!array_key_exists($zoomMin, $itemIdsByZoom)) {
                $itemIdsByZoom[$zoomMin] = [];
            }
            $itemIdsByZoom[$zoomMin][] = $id;
        }
    }

    // set last item zoom min = 0
    if (!$isOpenStart && !$isOpenEnd && count($airportBuffer) == 1) {
        $itemIdsByZoom[0][] = $airportBuffer[0]["id"];
    }

    // write to db
    foreach ($itemIdsByZoom as $zoomMin => $idList) {
        $query =  "UPDATE openaip_airports2";
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";
        DbService::execCUDQuery($conn, $query);
        //LoggingService::echoLineToBrowser($query);
    }

} while (count($airportBuffer) > 0);

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
    /*$color = 255 - round(200 / 15 * strlen($commonPrefix));
    print "<table style='background-color:rgb($color, $color, $color)'>\n";
    print "<tr><td colspan='2'>COMMON PREFIX2: '" . $commonPrefix . "'</td></tr>\n";
    print "<tr><td colspan='2'>START:" . $startPos2 . " LEN:" . $count2 . " OPENSTART:" . $isOpenStart2 . " OPENEND:" . $isOpenEnd2 . "</td></tr>\n";
    print "<tr><td>&nbsp;</td><td>\n";*/

    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "a");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "b");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "c");
    setBranchMinZoom($branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2,$commonPrefix . "d");

    //print "</td></tr>\n";

    if (!$isOpenStart2 && !$isOpenEnd2) {
        //print "<tr><td>sorting:</td><td>\n";

        if ($count2 > 1) {
            $sortItems = [];
            for ($i = 0; $i < $count2; $i++) {
                if (!array_key_exists("zoommin", $branchItems[$startPos2 + $i])) {
                    $sortItems[] = &$branchItems[$startPos2 + $i];
                }
            }
            usort($sortItems, "importanceComparer");
            $zoomMin = strlen($commonPrefix);

            //print "<tr><td colspan='2'>set zoom " . $zoomMin . " for items:";
            for ($i = 1; $i < count($sortItems); $i++) {
                $sortItems[$i]["zoommin"] = $zoomMin;
                //print " " . $sortItems[$i]["id"];
            }
            //print "</td></tr>\n";*/
        }

        // TEMP: get best item
        /*for ($i = 0; $i < $count2; $i++) {
            $item = $branchItems[$startPos2 + $i];
            if (!array_key_exists("zoommin", $item)) {
                print "<tr><td colspan='2'>best item: " . $item["id"] . "</td></tr>\n";
            }
        }*/
    }

    //print "</table>\n";
}


function importanceComparer($b, $a) {
    // sort level 1: has icao
    $aIcao = $a["icao"];
    $bIcao = $b["icao"];
    if ($aIcao && !$bIcao) {
        return 1;
    } elseif (!$aIcao && $bIcao) {
        return -1;
    }

    // sort level 2: airport type
    $aTypePrio = AIRPORT_TYPE_PRIO[$a["type"]];
    $bTypePrio = AIRPORT_TYPE_PRIO[$b["type"]];
    if ($aTypePrio != $bTypePrio) {
        return $aTypePrio - $bTypePrio;
    }

    // sort level 3: number of rwys
    $aRwyCount = intval($a["rwycount"]);
    $bRwyCount = intval($b["rwycount"]);
    if ($aRwyCount != $bRwyCount) {
        return $aRwyCount - $bRwyCount;
    }

    // sort level 4: longest rwy length
    $aRwyLen = intval($a["rwylen"]);
    $bRwyLen = intval($b["rwylen"]);
    if ($aRwyLen && $bRwyLen) {
        return $aRwyLen - $bRwyLen;
    } elseif ($aRwyLen) {
        return 1;
    } elseif ($bRwyLen) {
        return -1;
    }

    return 0;
}
