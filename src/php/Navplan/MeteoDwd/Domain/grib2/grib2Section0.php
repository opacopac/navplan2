<?php
require_once "grib2Base.php";


// Indicator Section
class Grib2Section0 extends Grib2SectionFixedLength {
    public $length = 16;
    public $magic;
    public $reserved;
    public $discipline;
    public $gribEdition;
    public $totalLength;


    protected function getLength() {
        return $this->length;
    }


    protected function parse($content) {
        $byteArray = unpack("a4a/n1b/C1c/Cd/J1e", $content);
        $this->magic = $byteArray["a"];
        $this->reserved = $byteArray["b"];
        $this->discipline = new Grib2Table0_0($byteArray["c"]);
        $this->gribEdition = $byteArray["d"];
        $this->totalLength = $byteArray["e"];
    }


    public function getDescription() {
        return array(
            "Section" => "0 (Indicator Section)",
            "Discipline" => $this->discipline->value . ": " . $this->discipline->getDescription(),
            "GRIB Edition" => $this->gribEdition,
            "Total Length" => $this->totalLength
        );
    }
}


// GRIB2 - TABLE 0.0
// DISCIPLINE
class Grib2Table0_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Meteorological Products";
            case 1: return "Hydrological Products";
            case 2: return "Land Surface Products";
            case 3: return "Space Products";
            case 4: return "Space Weather Products";
            case 10: return "Oceanographic Products";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}
