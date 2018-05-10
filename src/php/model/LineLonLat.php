<?php
require_once __DIR__ . "/PointLonLat.php";
require_once __DIR__ . "/../services/GeoService.php";


class LineLonLat extends Geometry2d {
    const DEFAULT_POINT_DELIMITER_STRING = ",";
    public $points;


    public function __construct() {
        parent::__construct();
        $this->points = [];
    }


    public function __clone() {
        for ($i = 0; $i < count($this->points); $i++) {
            $this->points[$i] = clone $this->points[$i];
        }
    }


    public static function createFromArray($lineArray) {
        $line = new PolygonLonLat();
        foreach ($lineArray as $lonLatPair) {
            $line->points[] = PointLonLat::getFromArray($lonLatPair);
        }

        return $line;
    }


    public function toArray() {
        $lineArray = [];
        foreach ($this->points as $point) {
            $lineArray[] = $point->toArray();
        }

        return $lineArray;
    }


    public static function createFromString($lineString, $pointDelimiter = self::DEFAULT_POINT_DELIMITER_STRING, $lonLatDelimiter = PointLonLat::DEFAULT_LONLAT_DELIMITER_STRING) {
        $line = new LineLonLat();
        $coordPairs = explode($pointDelimiter, $lineString);
        foreach ($coordPairs as $lonLatString) {
            $line->points[] = PointLonLat::createFromString($lonLatString, $lonLatDelimiter);
        }

        return $line;
    }


    public function toString($pointDelimiter = self::DEFAULT_POINT_DELIMITER_STRING, $lonLatDelimiter = PointLonLat::DEFAULT_LONLAT_DELIMITER_STRING) {
        $lonLatStrings = [];
        foreach ($this->points as $point) {
            $lonLatStrings[] = join($lonLatDelimiter, $point->toArray());
        }

        return join($pointDelimiter, $lonLatStrings);
    }


    public function reduceCoordinateAccuracy($roundToDigits = PointLonLat::DEFAULT_REDUCED_ACCURACY_DIGITS) {
        foreach ($this->points as $point) {
            $point->reduceCoordinateAccuracy($roundToDigits);
        }
    }


    public function getSimplifiedShape($epsilon) {
        $simplifiedLine = GeoService::simplifyLine($this->points, $epsilon);
        return self::createFromArray($simplifiedLine);
    }
}
