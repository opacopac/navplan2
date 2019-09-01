<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect3.shtml
class Section3 {
    private $source;
    private $numDataPoints;
    private $numBytesNumberPointsList;
    private $numberPointsListInterpretation;
    private $gridDefTemplate;


    // region GETTER

    public function getSource(): GridDefinitionSource {
        return $this->source;
    }


    public function getNumDataPoints(): int {
        return $this->numDataPoints;
    }


    public function getNumBytesNumberPointsList(): int {
        return $this->numBytesNumberPointsList;
    }


    public function getNumberPointsListInterpretation(): NumberOfPointsInterpretation {
        return $this->numberPointsListInterpretation;
    }


    public function getGridDefTemplate(): IGridDefinitionTemplate {
        return $this->gridDefTemplate;
    }

    // endregion


    public function __construct(
        GridDefinitionSource $source,
        int $numDataPoints,
        int $numBytesNumberPointsList,
        NumberOfPointsInterpretation $numberPointsListInterpretation,
        IGridDefinitionTemplate $gridDefTemplate
    ) {
        $this->source = $source;
        $this->numDataPoints = $numDataPoints;
        $this->numBytesNumberPointsList = $numBytesNumberPointsList;
        $this->numberPointsListInterpretation = $numberPointsListInterpretation;
        $this->gridDefTemplate = $gridDefTemplate;
    }
}
