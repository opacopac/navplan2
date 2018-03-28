<?php

class IndexItemAirport extends IndexItemBase {
    const airportTypePrio = array(
        "INTL_APT" => 11,
        "AF_CIVIL" => 10,
        "AF_MIL_CIVIL" => 9,
        "APT" => 8,
        "AD_MIL" => 7,
        "GLIDING" => 6,
        "LIGHT_AIRCRAFT" => 5,
        "HELI_CIVIL" => 4,
        "HELI_MIL" => 3,
        "AF_WATER" => 2,
        "AD_CLOSED" => 1,
    );


    public function __construct($rs) {
        parent::__construct(
            intval($rs["id"]),
            floatval($rs["longitude"]),
            floatval($rs["latitude"]),
            $rs
        );
    }


    public static function loadItems($conn, $startId, $maxResults) {
        $query = "SELECT id, latitude, longitude, type, icao, ";
        $query .= " (SELECT COUNT(rwy.id) FROM openaip_runways rwy WHERE rwy.airport_id = apt.id) AS rwycount,";
        $query .= " (SELECT rwy.length FROM openaip_runways rwy WHERE rwy.airport_id = apt.id ORDER BY rwy.length DESC LIMIT 1) AS rwylen";
        $query .= " FROM openaip_airports apt";
        $query .= " WHERE";
        $query .= "  apt.id >= '" . $startId . "'";
        $query .= " ORDER BY";
        $query .= "  apt.id ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query,"error loading airports");

        $airports = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $airports[] = new IndexItemAirport($rs);
        }

        return $airports;
    }


    public static function importanceComparer($b, $a) {
        // sort level 1: has icao
        $aIcao = $a->rs["icao"];
        $bIcao = $b->rs["icao"];
        if ($aIcao && !$bIcao) {
            return 1;
        } elseif (!$aIcao && $bIcao) {
            return -1;
        }

        // sort level 2: airport type
        $aTypePrio = self::airportTypePrio[$a->rs["type"]];
        $bTypePrio = self::airportTypePrio[$b->rs["type"]];
        if ($aTypePrio != $bTypePrio) {
            return $aTypePrio - $bTypePrio;
        }

        // sort level 3: number of rwys
        $aRwyCount = intval($a->rs["rwycount"]);
        $bRwyCount = intval($b->rs["rwycount"]);
        if ($aRwyCount != $bRwyCount) {
            return $aRwyCount - $bRwyCount;
        }

        // sort level 4: longest rwy length
        $aRwyLen = intval($a->rs["rwylen"]);
        $bRwyLen = intval($b->rs["rwylen"]);
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
