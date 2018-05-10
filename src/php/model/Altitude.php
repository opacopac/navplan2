<?php


class AltUnit extends SplEnum {
    const M = 1;
    const FT = 2;
    const FL = 3;
}


class AltReference extends SplEnum {
    const MSL = 1;
    const GND = 2;
    const STD = 3;
}


class Altitude {
    public $value;
    public $unit;
    public $reference;


    public function __construct($value, AltUnit $unit, AltReference $reference) {
        $this->value = $value;
        $this->unit = $unit;
        $this->reference = $reference;
    }
}
