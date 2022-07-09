<?php
include_once __DIR__ . "/ZoomLevelSortItemType.php";
include_once __DIR__ . "/../../php/Navplan/Db\MySqlDb/DbService.php";

use Navplan\System\DomainModel\DbException;
use Navplan\System\MySqlDb\DbConnection;
use Navplan\System\MySqlDb\DbService;
use Navplan\System\MySqlDb\MySqlDbResult;


class ZoomLevelSortItemTypeAirport implements ZoomLevelSortItemType {
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


    private $conn;


    public function __construct(DbConnection $conn) {
        $this->conn = $conn;
    }


    /**
     * @throws DbException
     */
    public function cleanZoomLevels() {
        $query =  "UPDATE openaip_airports2 SET zoommin = NULL";
        DbService::execCUDQuery($this->conn, $query);
    }


    /**
     * @param string $lastGeoHash
     * @param int $maxCount
     * @return MySqlDbResult
     * @throws DbException
     */
    public function getNextBatch(?string $lastGeoHash, int $maxCount) {
        $query = " SELECT apt.id, apt.type, apt.latitude, apt.longitude, apt.icao, apt.geohash,";
        $query .= " (SELECT COUNT(rwy.id) FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id) AS rwycount,";
        $query .= " (SELECT rwy.length FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id ORDER BY rwy.length DESC LIMIT 1) AS rwylen";
        $query .= " FROM openaip_airports2 apt";
        $query .= " WHERE";
        $query .= "  apt.zoommin IS NULL";
        $query .= $lastGeoHash !== NULL ? " AND apt.geohash > '" . $lastGeoHash . "'" : "";
        $query .= " ORDER BY apt.geohash ASC";
        $query .= " LIMIT " . $maxCount;
        return DbService::execMultiResultQuery($this->conn, $query);
    }


    /**
     * @param int $zoomMin
     * @param array $idList
     * @throws DbException
     */
    public function updateZoomLevels(int $zoomMin, array $idList) {
        $query =  "UPDATE openaip_airports2";
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";
        DbService::execCUDQuery($this->conn, $query);
    }


    public function importanceComparer($b, $a) {
        // sort level 1: has icao
        $aIcao = $a["icao"];
        $bIcao = $b["icao"];
        if ($aIcao && !$bIcao) {
            return 1;
        } elseif (!$aIcao && $bIcao) {
            return -1;
        }

        // sort level 2: airport type
        $aTypePrio = self::AIRPORT_TYPE_PRIO[$a["type"]];
        $bTypePrio = self::AIRPORT_TYPE_PRIO[$b["type"]];
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
}
