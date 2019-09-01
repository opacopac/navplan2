<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section0;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect0.shtml
class Section0 {
    private $discipline;
    private $gribEdition;


    // region GETTER

    public function getDiscipline(): Discipline {
        return $this->discipline;
    }


    public function getGribEdition(): int {
        return $this->gribEdition;
    }

    // endregion


    public function __construct(
        Discipline $discipline,
        int $gribEdition
    ) {
        $this->discipline = $discipline;
        $this->gribEdition = $gribEdition;
    }
}
