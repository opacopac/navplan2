<?php
require_once __DIR__ . "/PolygonLonLat.php";


class MultiPolygonLonLat extends Geometry2d {
    public $polygons;


    public function __construct() {
        parent::__construct();
        $this->polygons = [];
    }


    public function __clone() {
        for ($i = 0; $i < count($this->polygons); $i++) {
            $this->polygons[$i] = clone $this->polygons[$i];
        }
    }


    public static function createFromArray($multiPolygonArray) {
        $multiPolygon = new MultiPolygonLonLat();
        foreach ($multiPolygonArray as $polygonArray) {
            $multiPolygon->polygons[] = PolygonLonLat::getFromArray($polygonArray);
        }

        return $multiPolygon;
    }


    public function toArray() {
        $multiPolygonArray = [];
        foreach ($this->polygons as $polygon) {
            $multiPolygonArray[] = $polygon->toArray();
        }

        return $multiPolygonArray;
    }


    public function reduceCoordinateAccuracy($roundToDigits = 6) {
        foreach ($this->polygons as $polygon) {
            $polygon->reduceCoordinateAccuracy($roundToDigits);
        }
    }


    public function getSimplifiedShape($epsilon) {
        $simplifiedMultipoly = clone $this;

        for ($i = 0; $i < count($simplifiedMultipoly->polygons); $i++) {
            $simplifiedMultipoly->polygons[$i] = $simplifiedMultipoly->polygons[$i]->getSimplifiedShape($epsilon);
        }

        return $simplifiedMultipoly;
    }
}
