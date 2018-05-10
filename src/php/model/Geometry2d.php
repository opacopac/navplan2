<?php

abstract class Geometry2d {
    public function __construct() {
    }


    public abstract function getSimplifiedShape($epsilon);


    public abstract function reduceCoordinateAccuracy($roundToDigits);
}
