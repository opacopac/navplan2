<?php

class IndexItemNavaid extends IndexItemBase {
    const navaidTypePrio = array(
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


    public function __construct($rs) {
        parent::__construct(
            intval($rs["id"]),
            floatval($rs["longitude"]),
            floatval($rs["latitude"]),
            $rs
        );
    }


    public static function loadItems($conn, $startId, $maxResults) {
        $query = "SELECT id, latitude, longitude, type";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "  id >= '" . $startId . "'";
        $query .= " ORDER BY";
        $query .= "  id ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query,"error loading navaids");

        $navaids = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $navaids[] = new IndexItemNavaid($rs);
        }

        return $navaids;
    }


    public static function importanceComparer($b, $a) {
        $aTypePrio = self::navaidTypePrio[$a->rs["type"]];
        $bTypePrio = self::navaidTypePrio[$b->rs["type"]];

        return $aTypePrio - $bTypePrio;
    }
}
