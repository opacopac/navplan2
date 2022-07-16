<?php declare(strict_types=1);

namespace Navplan\OpenAip\ZoomLevelSorter;

use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;


class NavaidZoomLevelSortItem implements IZoomLevelSortItem {
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


    public function __construct(private IDbService $dbService) {
    }


    public function cleanZoomLevels() {
        $query =  "UPDATE openaip_navaids2 SET zoommin = NULL";

        $this->dbService->execCUDQuery($query);
    }


    public function getNextBatch(?string $lastGeoHash, int $maxCount): IDbResult {
        // read batch from DB
        $query = "SELECT ";
        $query .= "  id, type, latitude, longitude, geohash";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  zoommin IS NULL";
        $query .= $lastGeoHash !== NULL ? " AND geohash > '" . $lastGeoHash . "'" : "";
        $query .= " ORDER BY geohash ASC";
        $query .= " LIMIT " . $maxCount;

        return $this->dbService->execMultiResultQuery($query);
    }


    /**
     * @param int $zoomMin
     * @param int[] $idList
     */
    public function updateZoomLevels(int $zoomMin, array $idList) {
        $query = "UPDATE openaip_navaids2";
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";

        $this->dbService->execCUDQuery($query);
    }


    public function importanceComparer($b, $a): int
    {
        $aTypePrio = self::NAVAID_TYPE_PRIO[$a["type"]];
        $bTypePrio = self::NAVAID_TYPE_PRIO[$b["type"]];
        return $aTypePrio - $bTypePrio;
    }
}
