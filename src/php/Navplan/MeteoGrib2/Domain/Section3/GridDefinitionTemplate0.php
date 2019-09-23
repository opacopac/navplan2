<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_temp3-0.shtml
class GridDefinitionTemplate0 implements IGridDefinitionTemplate {
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


    // region GETTER

    public function getTemplateNumber(): int {
        return 0;
    }


    public function getShapeOfEarth(): EarthShape {
        return $this->shapeOfEarth;
    }


    public function getNumPointsParallel(): int {
        return $this->numPointsParallel;
    }


    public function getNumPointsMeridian(): int {
        return $this->numPointsMeridian;
    }


    public function getBasicAngle(): int {
        return $this->basicAngle;
    }


    public function getBasicAngleSubdivisions(): int {
        return $this->basicAngleSubdivisions;
    }


    public function getFirstGridPoint(): LatLon {
        return $this->firstGridPoint;
    }


    public function getResolutionComponentsFlags(): ResolutionAndComponentFlags {
        return $this->resolutionComponentsFlags;
    }


    public function getLastGridPoint(): LatLon {
        return $this->lastGridPoint;
    }


    public function getIDirectionInc(): float {
        return $this->iDirectionInc;
    }


    public function getJDirectionInc(): float {
        return $this->jDirectionInc;
    }


    public function getScanningMode(): ScanningMode {
        return $this->scanningMode;
    }

    // endregion


    public function __construct(
        EarthShape $shapeOfEarth,
        int $numPointsParallel,
        int $numPointsMeridian,
        int $basicAngle,
        int $basicAngleSubdivisions,
        LatLon $firstGridPoint,
        ResolutionAndComponentFlags $resolutionComponentsFlags,
        LatLon $lastGridPoint,
        float $iDirectionInc,
        float $jDirectionInc,
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
        $this->iDirectionInc = $iDirectionInc / 1000000;
        $this->jDirectionInc = $jDirectionInc / 1000000;
        $this->scanningMode = $scanningMode;
    }
}
