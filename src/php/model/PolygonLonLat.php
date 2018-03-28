<?php
require_once __DIR__ . "/PointLonLat.php";


class PolygonLonLat {
    public $points = [];


    public function __construct() {
    }


    public static function createFromArray($polygonArray) {
        $polygon = new PolygonLonLat();
        foreach ($polygonArray as $pointArray) {
            $polygon->points[] = PointLonLat::getFromArray($pointArray);
        }

        return $polygon;
    }


    public function getAsArray() {
        $polygonArray = [];
        foreach ($this->points as $point) {
            $polygonArray[] = $point->getAsArray();
        }

        return $polygonArray;
    }
}
