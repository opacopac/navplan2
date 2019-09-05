<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section6;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect6.shtml
class Section6 {
    private $bitMapIndicator;
    private $bitMap;


    // region GETTER

    public function getBitMapIndicator(): int {
        return $this->bitMapIndicator;
    }

    public function getBitMap(): ?string {
        return $this->bitMap;
    }

    // endregion


    public function __construct(
        int $bitMapIndicator,
        ?string $bitMap
    ) {
        $this->bitMapIndicator = $bitMapIndicator;
        $this->bitMap = $bitMap;
    }
}
