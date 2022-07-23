<?php declare(strict_types=1);

namespace Navplan\OpenAip\ZoomLevelSorter;

use Navplan\Aerodrome\DbModel\DbTableAirport;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;


class AirportZoomLevelSortItem implements IZoomLevelSortItem {
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


    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function cleanZoomLevels() {
        $query =  "UPDATE " . DbTableAirport::TABLE_NAME . " SET zoommin = NULL";

        $this->dbService->execCUDQuery($query);
    }


    public function getNextBatch(?string $lastGeoHash, int $maxCount): IDbResult {
        $query = " SELECT apt.id, apt.type, apt.latitude, apt.longitude, apt.icao, apt.geohash,";
        $query .= " (SELECT COUNT(rwy.id) FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id) AS rwycount,";
        $query .= " (SELECT rwy.length FROM openaip_runways2 rwy WHERE rwy.airport_id = apt.id ORDER BY rwy.length DESC LIMIT 1) AS rwylen";
        $query .= " FROM " . DbTableAirport::TABLE_NAME . " apt";
        $query .= " WHERE";
        $query .= "  apt.zoommin IS NULL";
        $query .= $lastGeoHash !== NULL ? " AND apt.geohash > '" . $lastGeoHash . "'" : "";
        $query .= " ORDER BY apt.geohash ASC";
        $query .= " LIMIT " . $maxCount;

        return $this->dbService->execMultiResultQuery($query);
    }


    /**
     * @param int $zoomMin
     * @param int[] $idList
     */
    public function updateZoomLevels(int $zoomMin, array $idList) {
        $query = "UPDATE " . DbTableAirport::TABLE_NAME;
        $query .= " SET zoommin = " . $zoomMin;
        $query .= " WHERE id IN (" . join(",", $idList) . ")";

        $this->dbService->execCUDQuery($query);
    }


    public function importanceComparer($b, $a): int
    {
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
