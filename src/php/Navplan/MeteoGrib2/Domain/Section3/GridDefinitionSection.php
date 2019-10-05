<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect3.shtml
class GridDefinitionSection {
    private $source;
    private $dataPointCount;
    private $numberOfPoints;
    private $gridDefTemplate;


    // region GETTER

    public function getSource(): GridDefinitionSource {
        return $this->source;
    }


    public function getDataPointCount(): int {
        return $this->dataPointCount;
    }


    public function getNumberOfPoints(): NumberOfPoints {
        return $this->numberOfPoints;
    }


    public function getGridDefTemplate(): IGridDefinitionTemplate {
        return $this->gridDefTemplate;
    }

    // endregion


    public function __construct(
        GridDefinitionSource $source,
        int $dataPointCount,
        NumberOfPoints $numberOfPoints,
        IGridDefinitionTemplate $gridDefTemplate
    ) {
        $this->source = $source;
        $this->dataPointCount = $dataPointCount;
        $this->numberOfPoints = $numberOfPoints;
        $this->gridDefTemplate = $gridDefTemplate;
    }
}
