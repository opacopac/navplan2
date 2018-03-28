<?php

class PointLonLat {
    public $longitude;
    public $latitude;


    public function __construct($longitude, $latitude) {
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }


    public static function createFromArray($lonLat) {
        return new PointLonLat($lonLat[0], $lonLat[1]);
    }


    public function getAsArray() {
        return [ $this->longitude, $this->longitude ];
    }
}
