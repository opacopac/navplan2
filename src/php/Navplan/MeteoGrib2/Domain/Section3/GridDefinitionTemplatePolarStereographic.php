<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_temp3-20.shtml
class GridDefinitionTemplatePolarStereographic implements IGridDefinitionTemplate {
    private $shapeOfEarth;
    private $numPointsXAxis;
    private $numPointsYAxis;
    private $firstGridPoint;
    private $resolutionComponentsFlags;
    private $latDlonV;
    private $xDirectionGridLength;
    private $yDirectionGridLength;
    private $projectionCenter;
    private $scanningMode;


    // region GETTER

    public function getShapeOfEarth(): EarthShape {
        return $this->shapeOfEarth;
    }


    public function getNumPointsXAxis(): int {
        return $this->numPointsXAxis;
    }


    public function getNumPointsYAxis(): int {
        return $this->numPointsYAxis;
    }


    public function getFirstGridPoint(): LatLon {
        return $this->firstGridPoint;
    }


    public function getResolutionComponentsFlags(): ResolutionAndComponentFlags {
        return $this->resolutionComponentsFlags;
    }


    public function getLatDlonV(): LatLon {
        return $this->latDlonV;
    }


    public function getXDirectionGridLength(): int {
        return $this->xDirectionGridLength;
    }


    public function getYDirectionGridLength(): int {
        return $this->yDirectionGridLength;
    }


    public function getProjectionCenter(): ProjectionCenter {
        return $this->projectionCenter;
    }


    public function getScanningMode(): ScanningMode {
        return $this->scanningMode;
    }


    public function getTemplateType(): GridDefinitionTemplateType {
        return new GridDefinitionTemplateType(GridDefinitionTemplateType::POLAR_STEREOGRAPHIC);
    }

    // endregion


    public function __construct(
        EarthShape $shapeOfEarth,
        int $numPointsXAxis,
        int $numPointsYAxis,
        LatLon $firstGridPoint,
        ResolutionAndComponentFlags $resolutionComponentsFlags,
        LatLon $latDlonV,
        int $xDirectionGridLength,
        int $yDirectionGridLength,
        ProjectionCenter $projectionCenter,
        ScanningMode $scanningMode
    ) {
        $this->shapeOfEarth = $shapeOfEarth;
        $this->numPointsXAxis = $numPointsXAxis;
        $this->numPointsYAxis = $numPointsYAxis;
        $this->firstGridPoint = $firstGridPoint;
        $this->resolutionComponentsFlags = $resolutionComponentsFlags;
        $this->latDlonV = $latDlonV;
        $this->xDirectionGridLength = $xDirectionGridLength;
        $this->yDirectionGridLength = $yDirectionGridLength;
        $this->projectionCenter = $projectionCenter;
        $this->scanningMode = $scanningMode;
    }
}
