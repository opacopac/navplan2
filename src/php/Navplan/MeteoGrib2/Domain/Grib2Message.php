<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain;

use http\Exception\InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section0\Section0;
use Navplan\MeteoGrib2\Domain\Section1\Section1;
use Navplan\MeteoGrib2\Domain\Section2\Section2;
use Navplan\MeteoGrib2\Domain\Section3\Section3;
use Navplan\MeteoGrib2\Domain\Section4\Section4;
use Navplan\MeteoGrib2\Domain\Section5\Section5;
use Navplan\MeteoGrib2\Domain\Section6\Section6;
use Navplan\MeteoGrib2\Domain\Section7\Section7;
use Navplan\MeteoGrib2\Domain\Section8\Section8;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/
class Grib2Message {
    private $section0 = NULL;
    private $section1 = NULL;
    private $section2List = [];
    private $section3List = [];
    private $section4List = [];
    private $section5List = [];
    private $section6List = [];
    private $section7List = [];
    private $section8 = NULL;


    // region GETTER

    public function getSection0(): ?Section0 {
        return $this->section0;
    }


    public function getSection1(): ?Section1 {
        return $this->section1;
    }


    public function getSection2List(): array {
        return $this->section2List;
    }


    public function getSection3List(): array {
        return $this->section3List;
    }


    public function getSection4List(): array {
        return $this->section4List;
    }


    public function getSection5List(): array {
        return $this->section5List;
    }


    public function getSection6List(): array {
        return $this->section6List;
    }


    public function getSection7List(): array {
        return $this->section7List;
    }


    public function getSection8(): ?Section8 {
        return $this->section8;
    }

    // endregion


    public function __construct() {
    }


    public function addSection0(Section0 $section0): void {
        if ($this->section0 !== NULL) {
            throw new InvalidArgumentException('section0 must only be added once');
        }

        $this->section0 = $section0;
    }


    public function addSection1(Section1 $section1): void {
        if ($this->section1 !== NULL) {
            throw new InvalidArgumentException('section1 must only be added once');
        }

        $this->section1 = $section1;
    }


    public function addSection2(Section2 $section2): void {
        $this->section2List[] = $section2;
    }


    public function addSection3(Section3 $section3): void {
        $this->section3List[] = $section3;
    }


    public function addSection4(Section4 $section4): void {
        $this->section4List[] = $section4;
    }


    public function addSection5(Section5 $section5): void {
        $this->section5List[] = $section5;
    }


    public function addSection6(Section6 $section6): void {
        $this->section6List[] = $section6;
    }


    public function addSection7(Section7 $section7): void {
        $this->section7List[] = $section7;
    }


    public function addSection8(Section8 $section8): void {
        if ($this->section8 !== NULL) {
            throw new InvalidArgumentException('section8 must only be added once');
        }

        $this->section8 = $section8;
    }



}
