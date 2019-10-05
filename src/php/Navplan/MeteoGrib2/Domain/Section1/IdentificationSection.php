<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect1.shtml
class IdentificationSection {
    private $origin;
    private $tableVersion;
    private $referenceTime;
    private $productionStatus;
    private $processedDataType;


    // region GETTER

    public function getOrigin(): Origin {
        return $this->origin;
    }


    public function getTableVersion(): TableVersion {
        return $this->tableVersion;
    }


    public function getReferenceTime(): ReferenceTime {
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
        Origin $origin,
        TableVersion $tableVersion,
        ReferenceTime $referenceTime,
        ProductionStatus $productionStatus,
        DataType $processedDataType
    ) {
        $this->origin = $origin;
        $this->tableVersion = $tableVersion;
        $this->referenceTime = $referenceTime;
        $this->productionStatus = $productionStatus;
        $this->processedDataType = $processedDataType;
    }
}
