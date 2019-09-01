<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


class GridDefinitionTemplateLatLonRotated implements IGridDefinitionTemplate {
    public $shapeOfEarth;
    public $sphericalEarthRadiusScaleFactor;
    public $sphericalEarthRadiusScaleValue;
    public $oblateSpheroidEarthMajorAxisScaleFactor;
    public $oblateSpheroidEarthMajorAxisScaleValue;
    public $oblateSpheroidEarthMinorAxisScaleFactor;
    public $oblateSpheroidEarthMinorAxisScaleValue;
    public $numPointsParallel;
    public $numPointsMeridian;
    public $basicAngle;
    public $basicAngleSubdivisions;
    public $firstGridPointLat;
    public $firstGridPointLon;
    public $resolutionComponentsFlags;
    public $lastGridPointLat;
    public $lastGridPointLon;
    public $iDirectionInc;
    public $jDirectionInc;
    public $scanningMode;


    public function __construct(
    ) {
    }


    public function getTemplateType(): GridDefinitionTemplateType {
        return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON_ROTATED);
    }
}
