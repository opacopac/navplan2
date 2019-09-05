<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;

use DateInterval;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_temp4-0.shtml
class ProductDefinitionTemplate0 implements IProductDefinitionTemplate {
    private $parameter;
    private $generatingProcess;
    private $cutOffTime;
    private $forecastTime;
    private $fixedSurface1;
    private $fixedSurface2;


    // region GETTER

    public function getTemplateNumber(): int {
        return 0;
    }


    public function getParameter(): Parameter {
        return $this->parameter;
    }


    public function getGeneratingProcess(): GeneratingProcess {
        return $this->generatingProcess;
    }


    public function getCutOffTime(): DateInterval {
        return $this->cutOffTime;
    }


    public function getForecastTime(): ?DateInterval {
        return $this->forecastTime;
    }


    public function getFixedSurface1(): FixedSurface {
        return $this->fixedSurface1;
    }


    public function getFixedSurface2(): ?FixedSurface {
        return $this->fixedSurface2;
    }

    // endregion


    public function __construct(
        Parameter $parameter,
        GeneratingProcess $generatingProcess,
        DateInterval $cutOffTime,
        ?DateInterval $forecastTime,
        FixedSurface $fixedSurface1,
        ?FixedSurface $fixedSurface2
    ) {
        $this->parameter = $parameter;
        $this->generatingProcess = $generatingProcess;
        $this->cutOffTime = $cutOffTime;
        $this->forecastTime = $forecastTime;
        $this->fixedSurface1 = $fixedSurface1;
        $this->fixedSurface2 = $fixedSurface2;
    }
}
