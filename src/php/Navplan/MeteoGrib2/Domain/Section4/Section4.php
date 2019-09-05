<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect4.shtml
class Section4 {
    private $productDefinitionTemplate;
    private $coordinateValues;


    // region GETTER

    public function getProductDefinitionTemplate(): ?IProductDefinitionTemplate{
        return $this->productDefinitionTemplate;
    }


    public function getCoordinateValues(): array {
        return $this->coordinateValues;
    }

    // endregion


    public function __construct(
        ?IProductDefinitionTemplate $productDefinitionTemplate,
        array $coordinateValues
    ) {
        $this->productDefinitionTemplate = $productDefinitionTemplate;
        $this->coordinateValues = $coordinateValues;
    }
}
