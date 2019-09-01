<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


class EarthShape {
    public $shapeType;
    public $sphericalRadiusScaleFactor;
    public $sphericalRadiusScaleValue;
    public $oblateSpheroidMajorAxisScaleFactor;
    public $oblateSpheroidMajorAxisScaleValue;
    public $oblateSpheroidMinorAxisScaleFactor;
    public $oblateSpheroidMinorAxisScaleValue;


    public function __construct(
        EarthShapeType $shapeType,
        int $sphericalRadiusScaleFactor,
        int $sphericalRadiusScaleValue,
        int $oblateSpheroidMajorAxisScaleFactor,
        int $oblateSpheroidMajorAxisScaleValue,
        int $oblateSpheroidMinorAxisScaleFactor,
        int $oblateSpheroidMinorAxisScaleValue
    ) {
        $this->shapeType = $shapeType;
        $this->sphericalRadiusScaleFactor = $sphericalRadiusScaleFactor;
        $this->sphericalRadiusScaleValue = $sphericalRadiusScaleValue;
        $this->oblateSpheroidMajorAxisScaleFactor = $oblateSpheroidMajorAxisScaleFactor;
        $this->oblateSpheroidMajorAxisScaleValue = $oblateSpheroidMajorAxisScaleValue;
        $this->oblateSpheroidMinorAxisScaleFactor = $oblateSpheroidMinorAxisScaleFactor;
        $this->oblateSpheroidMinorAxisScaleValue = $oblateSpheroidMinorAxisScaleValue;
    }
}
