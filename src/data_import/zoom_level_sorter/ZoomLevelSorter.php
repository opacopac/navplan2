<?php
include_once __DIR__ . "/../../php/Navplan/Shared/GeoService.php";
include_once __DIR__ . "/../../php/Navplan/Shared/LoggingService.php";
include_once __DIR__ . "/ZoomLevelSortItemType.php";

use Navplan\Shared\GeoService;
use Navplan\Shared\LoggingService;


const MAX_ZOOM = 14;
const MAX_COUNT_DB_RECORDS = 1000;


class ZoomLevelSorter {
    public static function sort(ZoomLevelSortItemType $sortItemType) {
        // delete zoom levels from db
        $sortItemType->cleanZoomLevels();

        $lastGeoHash = NULL;
        $loopCount = 0;
        do {
            // circuit breaker
            if ($loopCount > 50)
                die("abort by circuit breaker: max loop count exceeded!");

            $isOpenStart = true;
            if ($lastGeoHash === NULL) {
                $isOpenStart = false;
            }

            // read batch from DB
            $result = $sortItemType->getNextBatch($lastGeoHash, MAX_COUNT_DB_RECORDS);
            LoggingService::echoLineToBrowser("loading " . $result->num_rows . " items" . ($lastGeoHash !== NULL ? " starting from " . $lastGeoHash : ""));

            $itemBuffer = [];
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $itemBuffer[] = $rs;
            }

            if ($result->num_rows < MAX_COUNT_DB_RECORDS) {
                $loopCount++;
                $lastGeoHash = NULL; // loop around
                $isOpenEnd = false;
            } else {
                $lastGeoHash = $itemBuffer[count($itemBuffer) - 1]["geohash"];
                $isOpenEnd = true;
            }

            // recursively set min zoom
            self::setBranchMinZoom($sortItemType, $itemBuffer, 0, count($itemBuffer), $isOpenStart, $isOpenEnd, "");

            // group ids by zoomlevel
            $itemIdsByZoom = array();
            for ($i = 0; $i < count($itemBuffer); $i++) {
                if (array_key_exists("zoommin", $itemBuffer[$i])) {
                    $id = $itemBuffer[$i]["id"];
                    $zoomMin = $itemBuffer[$i]["zoommin"];
                    if (!array_key_exists($zoomMin, $itemIdsByZoom)) {
                        $itemIdsByZoom[$zoomMin] = [];
                    }
                    $itemIdsByZoom[$zoomMin][] = $id;
                }
            }

            // set last item zoom min = 0
            if (!$isOpenStart && !$isOpenEnd && count($itemBuffer) == 1) {
                $itemIdsByZoom[0][] = $itemBuffer[0]["id"];
            }

            // write zoom levels to db
            foreach ($itemIdsByZoom as $zoomMin => $idList) {
                $sortItemType->updateZoomLevels($zoomMin, $idList);
            }

        } while (count($itemBuffer) > 0);

        LoggingService::echoLineToBrowser("done.");
    }


    private static function setBranchMinZoom(ZoomLevelSortItemType $sortItemType, &$branchItems, $startPos, $count, $isOpenStart, $isOpenEnd, $commonPrefix) {
        list($startPos2, $count2) = self::getCommonPrefixPointers($branchItems, $startPos, $count, $commonPrefix);

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

        self::setBranchMinZoom($sortItemType, $branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2, $commonPrefix . "a");
        self::setBranchMinZoom($sortItemType, $branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2, $commonPrefix . "b");
        self::setBranchMinZoom($sortItemType, $branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2, $commonPrefix . "c");
        self::setBranchMinZoom($sortItemType, $branchItems, $startPos2, $count2, $isOpenStart2, $isOpenEnd2, $commonPrefix . "d");

        if (!$isOpenStart2 && !$isOpenEnd2) {
            if ($count2 > 1) {
                $sortItems = [];
                for ($i = 0; $i < $count2; $i++) {
                    if (!array_key_exists("zoommin", $branchItems[$startPos2 + $i])) {
                        $sortItems[] = &$branchItems[$startPos2 + $i];
                    }
                }
                usort($sortItems, array($sortItemType, 'importanceComparer'));
                $zoomMin = strlen($commonPrefix);

                for ($i = 1; $i < count($sortItems); $i++) {
                    $sortItems[$i]["zoommin"] = $zoomMin;
                }
            }
        }
    }


    private static function getCommonPrefixPointers($itemList, $startPos, $maxCount, $commonPrefix) {
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
}
