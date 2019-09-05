<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section5;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_temp5-0.shtml
class DataRepresentationTemplate0 implements IDataRepresentationTemplate {
    private $referenceValue;
    private $binaryScaleFactor;
    private $decimalScaleFactor;
    private $bitsUsed;
    private $fieldType;


    // region GETTER

    public function getTemplateNumber(): int {
        return 0;
    }


    public function getReferenceValue(): float {
        return $this->referenceValue;
    }


    public function getBinaryScaleFactor(): int {
        return $this->binaryScaleFactor;
    }


    public function getDecimalScaleFactor(): int {
        return $this->decimalScaleFactor;
    }


    public function getBitsUsed(): int {
        return $this->bitsUsed;
    }


    public function getFieldType(): FieldType {
        return $this->fieldType;
    }

    // endregion


    public function __construct(
        float $referenceValue,
        int $binaryScaleFactor,
        int $decimalScaleFactor,
        int $bitsUsed,
        FieldType $fieldType
    ) {
        $this->referenceValue = $referenceValue;
        $this->binaryScaleFactor = $binaryScaleFactor;
        $this->decimalScaleFactor = $decimalScaleFactor;
        $this->bitsUsed = $bitsUsed;
        $this->fieldType = $fieldType;
    }
}
