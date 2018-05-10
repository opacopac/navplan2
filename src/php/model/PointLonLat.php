<?php

class PointLonLat extends Geometry2d {
    const DEFAULT_LONLAT_DELIMITER_STRING = " ";
    const DEFAULT_REDUCED_ACCURACY_DIGITS = 6;
    public $longitude;
    public $latitude;


    public function __construct($longitude, $latitude) {
        parent::__construct();
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }


    public static function createFromArray($lonLat) {
        return new PointLonLat($lonLat[0], $lonLat[1]);
    }


    public function toArray() {
        return [ $this->longitude, $this->longitude ];
    }


    public static function createFromString($lonLatString, $delimiter = self::DEFAULT_LONLAT_DELIMITER_STRING) {
        $coords = explode($delimiter, trim($lonLatString));
        return self::createFromArray($coords);
    }


    public function toString($delimiter = self::DEFAULT_LONLAT_DELIMITER_STRING) {
        return join($delimiter, [ $this->longitude, $this->latitude]);
    }


    public function reduceCoordinateAccuracy($roundToDigits = self::DEFAULT_REDUCED_ACCURACY_DIGITS) {
        $this->longitude = round($this->longitude, $roundToDigits);
        $this->latitude = round($this->latitude, $roundToDigits);
    }


    public function getSimplifiedShape($epsilon) {
        return clone $this;
    }
}
