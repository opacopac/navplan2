<?php
include_once "grib2Section0.php";
include_once "grib2Section1.php";
include_once "grib2Section2.php";
include_once "grib2Section3.php";
include_once "grib2Section4.php";
include_once "grib2Section5.php";
include_once "grib2Section6.php";
include_once "grib2Section7.php";
include_once "grib2Section8.php";


class Grib2Message {
    public $section0;
    public $section1;
    public $section2;
    public $section3;
    public $section4;
    public $section5;
    public $section6;
    public $section7;
    public $section8;


    public function parse($fileHandle, $imgFilename) {
        $this->section0 = new Grib2Section0($fileHandle);
        $this->section1 = new Grib2Section1($fileHandle);
        $this->section2 = new Grib2Section2($fileHandle);
        $this->section3 = new Grib2Section3($fileHandle);
        $this->section4 = new Grib2Section4($fileHandle, $this->section0->discipline);
        $this->section5 = new Grib2Section5($fileHandle);
        $this->section6 = new Grib2Section6($fileHandle);
        $this->section7 = new Grib2Section7($fileHandle,
            $this->section5->dataRepTemplateNumber,
            $this->section5->dataRepTemplate,
            $this->section3->gridDefTemplateNumber,
            $this->section3->gridDefTemplate,
            $imgFilename);
        $this->section8 = new Grib2Section8($fileHandle);
    }


    public function getDescription() {
        return array(
            "Section 0" => $this->section0->getDescription(),
            "Section 1" => $this->section1->getDescription(),
            "Section 2" => $this->section2->getDescription(),
            "Section 3" => $this->section3->getDescription(),
            "Section 4" => $this->section4->getDescription(),
            "Section 5" => $this->section5->getDescription(),
            "Section 6" => $this->section6->getDescription(),
            "Section 7" => $this->section7->getDescription(),
            "Section 8" => $this->section8->getDescription(),
        );

    }
}
