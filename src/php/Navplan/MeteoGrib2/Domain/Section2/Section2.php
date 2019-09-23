<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section2;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect2.shtml
class Section2 {
    private $data;


    public function getData(): string {
        return $this->data;
    }


    public function __construct(string $data) {
        $this->data = $data;
    }
}
