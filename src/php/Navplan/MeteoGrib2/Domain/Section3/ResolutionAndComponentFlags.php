<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-3.shtml
class ResolutionAndComponentFlags {
    private $isIDirectionIncrementsGiven;
    private $isJDirectionIncrementsGiven;
    private $isUVRelativeToEW;


    // region GETTER

    public function isIDirectionIncrementsGiven(): bool {
        return $this->isIDirectionIncrementsGiven;
    }


    public function isJDirectionIncrementsGiven(): bool {
        return $this->isJDirectionIncrementsGiven;
    }


    public function isUVRelativeToEW(): bool {
        return $this->isUVRelativeToEW;
    }

    // endregion


    public function __construct(
        bool $isIDirectionIncrementsGiven,
        bool $isJDirectionIncrementsGiven,
        bool $isUVRelativeToEW
    ) {
        $this->isIDirectionIncrementsGiven = $isIDirectionIncrementsGiven;
        $this->isJDirectionIncrementsGiven = $isJDirectionIncrementsGiven;
        $this->isUVRelativeToEW = $isUVRelativeToEW;
    }
}
