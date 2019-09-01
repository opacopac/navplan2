<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-5.shtml
class ProjectionCenter {
    private $isNorthPoleOnProjectionPlane;
    private $isProjectionBiPolar;


    // region GETTER

    public function isNorthPoleOnProjectionPlane(): bool {
        return $this->isNorthPoleOnProjectionPlane;
    }


    public function isProjectionBiPolar(): bool {
        return $this->isProjectionBiPolar;
    }

    // endregion


    public function __construct(
        bool $isNorthPoleOnProjectionPlane,
        bool $isProjectionBiPolar
    ) {
        $this->isNorthPoleOnProjectionPlane = $isNorthPoleOnProjectionPlane;
        $this->isProjectionBiPolar = $isProjectionBiPolar;
    }
}
