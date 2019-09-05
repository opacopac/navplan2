<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section7;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect7.shtml
class Section7 {
    private $values;


    // region GETTER

    public function getValues(): array {
        return $this->values;
    }

    // endregion


    public function __construct(
        array $values
    ) {
        $this->values = $values;
    }
}
