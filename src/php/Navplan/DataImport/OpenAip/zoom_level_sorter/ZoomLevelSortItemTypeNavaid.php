<?php
include_once __DIR__ . "/ZoomLevelSortItemType.php";
include_once __DIR__ . "/../../php/Navplan/Db\MySqlDb/DbService.php";

use Navplan\System\DomainModel\DbException;
use Navplan\System\MySqlDb\DbConnection;
use Navplan\System\MySqlDb\DbService;
use Navplan\System\MySqlDb\MySqlDbResult;


class ZoomLevelSortItemTypeNavaid implements ZoomLevelSortItemType {
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


    private $conn;


    public function __construct(DbConnection $conn) {
        $this->conn = $conn;
    }


    /**
     * @throws DbException
     */
    public function cleanZoomLevels() {
        $query =  "UPDATE openaip_navaids2 SET zoommin = NULL";
        DbService::execCUDQuery($this->conn, $query);
    }


    /**
     * @param string $lastGeoHash
     * @param int $maxCount
     * @return MySqlDbResult
     * @throws DbException
     */
    public function getNextBatch(?string $lastGeoHash, int $maxCount) {
    // read batch from DB
        $query = "SELECT ";
        $query .= "  id, type, latitude, longitude, geohash";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  zoommin IS NULL";
        $query .= $lastGeoHash !== NULL ? " AND geohash > '" . $lastGeoHash . "'" : "";
        $query .= " ORDER BY geohash ASC";
        $query .= " LIMIT " . $maxCount;
        return DbService::execMultiResultQuery($this->conn, $query);
    }


    /**
     * @param int $zoomMin
     * @param array $idList
     * @throws DbException
     */
    public function updateZoomLevels(int $zoomMin, array $idList) {
        $query = "UPDATE openaip_navaids2";
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";
        DbService::execCUDQuery($this->conn, $query);
    }


    public function importanceComparer($b, $a) {
        $aTypePrio = self::NAVAID_TYPE_PRIO[$a["type"]];
        $bTypePrio = self::NAVAID_TYPE_PRIO[$b["type"]];
        return $aTypePrio - $bTypePrio;
    }
}
