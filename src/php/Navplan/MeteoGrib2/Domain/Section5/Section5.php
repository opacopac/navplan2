<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section5;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect5.shtml
class Section5 {
    private $dataPointCount;
    private $dataRepresentationTemplate;


    // region GETTER

    public function getDataPointCount(): int {
        return $this->dataPointCount;
    }

    public function getDataRepresentationTemplate(): ?IDataRepresentationTemplate{
        return $this->dataRepresentationTemplate;
    }

    // endregion


    public function __construct(
        int $dataPointCount,
        ?IDataRepresentationTemplate $dataRepresentationTemplate
    ) {
        $this->dataPointCount = $dataPointCount;
        $this->dataRepresentationTemplate = $dataRepresentationTemplate;
    }
}
