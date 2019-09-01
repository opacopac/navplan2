<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain;

use Navplan\MeteoGrib2\Domain\Section0\Section0;
use Navplan\MeteoGrib2\Domain\Section1\Section1;
use Navplan\MeteoGrib2\Domain\Section2\Section2;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/
class Grib2Message {
    private $section0;
    private $section1;
    private $section2;
    private $section3;
    private $section4;
    private $section5;
    private $section6;
    private $section7;
    private $section8;


    // region getter

    public function getSection0(): Section0 {
        return $this->section0;
    }


    public function getSection1(): Section1 {
        return $this->section1;
    }


    public function getSection2(): Section2 {
        return $this->section2;
    }

    // endregion


    public function __construct(
        Section0 $section0,
        Section1 $section1,
        Section2 $section2
    ) {
        $this->section0 = $section0;
        $this->section1 = $section1;
        $this->section2 = $section2;
    }
}
