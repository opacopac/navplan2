<?php
require_once "grib2Base.php";


// Bit Map Section
class Grib2Section6 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $bitmapIndicator;
    public $bitmap;


    public function parse($content) {
        $byteArray = unpack("C1a/C1b/a*c", $content);
        $this->sectionNumber = $byteArray["a"];
        $this->bitmapIndicator = new Grib2Table6_0($byteArray["b"]);
        $this->bitmap = $byteArray["c"];
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Bit Map Section)",
            "Bitmap Indicator" => $this->bitmapIndicator->value . ": " . $this->bitmapIndicator->getDescription()
        );
    }
}


// GRIB2 - TABLE 6.0
// BIT MAP INDICATOR
class Grib2Table6_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "A bit map applies to this product and is specified in this section.";
            case 254: return "A bit map previously defined in the same GRIB2 message applies to this product.";
            case 255: return "A bit map does not apply to this product.";
            default: return "A bit map pre-determined by the orginating/generating center applies to this product and is not specified in this section.";
        }
    }
}
