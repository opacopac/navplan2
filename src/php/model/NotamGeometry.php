<?php

class NotamGeometry {
    public $geometry2d;
    public $topAlt;
    public $bottomAlt;


    public function __construct(Geometry2d $geometry2d, Altitude $topAlt, Altitude $bottomAlt) {
        $this->geometry2d = $geometry2d;
        $this->topAlt = $topAlt;
        $this->bottomAlt = $bottomAlt;
    }
}
