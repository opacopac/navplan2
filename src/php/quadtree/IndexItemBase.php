<?php
include_once __DIR__ . "/../../php/services/DbService.php";


abstract class IndexItemBase {
    public $id;
    public $longitude;
    public $latitude;
    public $rs;


    public function __construct($id, $longitude, $latitude, $rs) {
        $this->id = $id;
        $this->longitude = $longitude;
        $this->latitude = $latitude;
        $this->rs = $rs;
    }


    public static abstract function loadItems($conn, $startId, $maxResults);


    public static abstract function importanceComparer($a, $b);
}
