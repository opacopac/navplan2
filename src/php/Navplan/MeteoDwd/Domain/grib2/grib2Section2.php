<?php
require_once "grib2Base.php";


// Local Use Section
class Grib2Section2 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $localUse;


    public function parse($content) {
        $byteArray = unpack("C1a", $content);
        $this->sectionNumber = $byteArray["a"];
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Local Use Section)",
            "Bytes" => $this->length
        );
    }
}
