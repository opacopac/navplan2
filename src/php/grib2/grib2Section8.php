<?php
require_once "grib2Base.php";


// End Section
class Grib2Section8 extends Grib2SectionFixedLength {
    public $length = 4;
    public $content;


    protected function getLength() {
        return $this->length;
    }


    protected function parse($content) {
        $byteArray = unpack("a4a", $content);
        $this->content = $byteArray["a"];
    }


    public function getDescription() {
        return array (
            "Section" => "8 (End Section)"
        );
    }
}
