<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_temp3-0.shtml
class GridDefinitionTemplateLatLon implements IGridDefinitionTemplate {
    private $shapeOfEarth;
    private $numPointsParallel;
    private $numPointsMeridian;
    private $basicAngle;
    private $basicAngleSubdivisions;
    private $firstGridPoint;
    private $resolutionComponentsFlags;
    private $lastGridPoint;
    private $iDirectionInc;
    private $jDirectionInc;
    private $scanningMode;


    public function getTemplateType(): GridDefinitionTemplateType {
        return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON);
    }


    public function __construct(
        EarthShape $shapeOfEarth,
        int $numPointsParallel,
        int $numPointsMeridian,
        int $basicAngle,
        int $basicAngleSubdivisions,
        LatLon $firstGridPoint,
        ResolutionAndComponentFlags $resolutionComponentsFlags,
        LatLon $lastGridPoint,
        int $iDirectionInc,
        int $jDirectionInc,
        ScanningMode $scanningMode
    ) {
        $this->shapeOfEarth = $shapeOfEarth;
        $this->numPointsParallel = $numPointsParallel;
        $this->numPointsMeridian = $numPointsMeridian;
        $this->basicAngle = $basicAngle;
        $this->basicAngleSubdivisions = $basicAngleSubdivisions;
        $this->firstGridPoint = $firstGridPoint;
        $this->resolutionComponentsFlags = $resolutionComponentsFlags;
        $this->lastGridPoint = $lastGridPoint;
        $this->iDirectionInc = $iDirectionInc;
        $this->jDirectionInc = $jDirectionInc;
        $this->scanningMode = $scanningMode;
    }
}
