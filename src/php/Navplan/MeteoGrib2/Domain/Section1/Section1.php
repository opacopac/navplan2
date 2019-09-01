<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;

use DateTime;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect1.shtml
class Section1 {
    private $originCenter;
    private $originSubcenter;
    private $gribMasterTableVersion;
    private $gribLocalTableVersion;
    private $significanceReferenceTime;
    private $referenceTime;
    private $productionStatus;
    private $processedDataType;


    // region GETTER

    public function getOriginCenter(): int {
        return $this->originCenter;
    }


    public function getOriginSubcenter(): int {
        return $this->originSubcenter;
    }


    public function getGribMasterTableVersion(): int {
        return $this->gribMasterTableVersion;
    }


    public function getGribLocalTableVersion(): int {
        return $this->gribLocalTableVersion;
    }


    public function getSignificanceReferenceTime(): ReferenceTimeSignificance {
        return $this->significanceReferenceTime;
    }


    public function getReferenceTime(): DateTime {
        return $this->referenceTime;
    }


    public function getProductionStatus(): ProductionStatus {
        return $this->productionStatus;
    }


    public function getProcessedDataType(): DataType {
        return $this->processedDataType;
    }


    // endregion


    public function __construct(
        int $originCenter,
        int $originSubcenter,
        int $gribMasterTableVersion,
        int $gribLocalTableVersion,
        ReferenceTimeSignificance $significanceReferenceTime,
        DateTime $referenceTime,
        ProductionStatus $productionStatus,
        DataType $processedDataType
    ) {
        $this->originCenter = $originCenter;
        $this->originSubcenter = $originSubcenter;
        $this->gribMasterTableVersion = $gribMasterTableVersion;
        $this->gribLocalTableVersion = $gribLocalTableVersion;
        $this->significanceReferenceTime = $significanceReferenceTime;
        $this->referenceTime = $referenceTime;
        $this->productionStatus = $productionStatus;
        $this->processedDataType = $processedDataType;
    }
}
