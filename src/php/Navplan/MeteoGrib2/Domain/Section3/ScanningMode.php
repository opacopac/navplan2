<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;

// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-4.shtml
class ScanningMode {
    private $iScanDirectionWtoE;
    private $jScanDirectionNtoS;
    private $iConsecutivePoints;
    private $allRowsSameDirection;
    private $oddRowsAreOffset;
    private $evenRowsAreOffset;
    private $jDirOffset;
    private $allRowsNiColsNjPoints;


    // region GETTER

    public function isIScanDirectionWtoE(): bool {
        return $this->iScanDirectionWtoE;
    }


    public function isJScanDirectionNtoS(): bool {
        return $this->jScanDirectionNtoS;
    }


    public function isIConsecutivePoints(): bool {
        return $this->iConsecutivePoints;
    }


    public function isAllRowsSameDirection(): bool {
        return $this->allRowsSameDirection;
    }


    public function isOddRowsAreOffset(): bool {
        return $this->oddRowsAreOffset;
    }


    public function isEvenRowsAreOffset(): bool {
        return $this->evenRowsAreOffset;
    }


    public function isJDirOffset(): bool {
        return $this->jDirOffset;
    }


    public function isAllRowsNiColsNjPoints(): bool {
        return $this->allRowsNiColsNjPoints;
    }

    // endregion


    public function __construct(
        bool $iScanDirectionWtoE,
        bool $jScanDirectionNtoS,
        bool $iConsecutivePoints,
        bool $allRowsSameDirection,
        bool $oddRowsAreOffset,
        bool $evenRowsAreOffset,
        bool $jDirOffset,
        bool $allRowsNiColsNjPoints
    ) {
        $this->iScanDirectionWtoE = $iScanDirectionWtoE;
        $this->jScanDirectionNtoS = $jScanDirectionNtoS;
        $this->iConsecutivePoints = $iConsecutivePoints;
        $this->allRowsSameDirection = $allRowsSameDirection;
        $this->oddRowsAreOffset = $oddRowsAreOffset;
        $this->evenRowsAreOffset = $evenRowsAreOffset;
        $this->jDirOffset = $jDirOffset;
        $this->allRowsNiColsNjPoints = $allRowsNiColsNjPoints;
    }
}
