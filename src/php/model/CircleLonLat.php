<?php
require_once __DIR__ . "/PointLonLat.php";


class CircleLonLat extends Geometry2d
{
    public $center;
    public $radius_m;


    public function __construct(PointLonLat $center, $radius_m) {
        parent::__construct();
        $this->center = $center;
        $this->radius_m = $radius_m;
    }


    public function reduceCoordinateAccuracy($roundToDigits = PointLonLat::DEFAULT_REDUCED_ACCURACY_DIGITS) {
        $this->center->reduceCoordinateAccuracy($roundToDigits);
    }


    public function getSimplifiedShape($epsilon) {
        return clone $this;
    }
}
