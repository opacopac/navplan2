<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain;

use Navplan\MeteoGrib2\Domain\Section0\Section0;
use Navplan\MeteoGrib2\Domain\Section1\Section1;
use Navplan\MeteoGrib2\Domain\Section2\Section2;
use Navplan\MeteoGrib2\Domain\Section3\Section3;
use Navplan\MeteoGrib2\Domain\Section4\Section4;
use Navplan\MeteoGrib2\Domain\Section5\Section5;
use Navplan\MeteoGrib2\Domain\Section6\Section6;
use Navplan\MeteoGrib2\Domain\Section7\Section7;


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


    // region GETTER

    public function getSection0(): Section0 {
        return $this->section0;
    }


    public function getSection1(): Section1 {
        return $this->section1;
    }


    public function getSection2(): Section2 {
        return $this->section2;
    }


    public function getSection3(): Section3 {
        return $this->section3;
    }


    public function getSection4(): Section4 {
        return $this->section4;
    }


    public function getSection5(): Section5 {
        return $this->section5;
    }


    public function getSection6(): Section6 {
        return $this->section6;
    }


    public function getSection7(): Section7 {
        return $this->section7;
    }

    // endregion


    public function __construct(
        Section0 $section0,
        Section1 $section1,
        Section2 $section2,
        Section3 $section3,
        Section4 $section4,
        Section5 $section5,
        Section6 $section6,
        Section7 $section7
    ) {
        $this->section0 = $section0;
        $this->section1 = $section1;
        $this->section2 = $section2;
        $this->section3 = $section3;
        $this->section4 = $section4;
        $this->section5 = $section5;
        $this->section6 = $section6;
        $this->section7 = $section7;
    }
}
