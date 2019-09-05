<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


class EarthShape {
    private $shapeType;
    private $sphericalRadius;
    private $oblateSpheroidMajorAxis;
    private $oblateSpheroidMinorAxis;


    // region GETTER

    public function getShapeType(): EarthShapeType {
        return $this->shapeType;
    }


    public function getSphericalRadius(): float {
        return $this->sphericalRadius;
    }


    public function getOblateSpheroidMajorAxis(): float {
        return $this->oblateSpheroidMajorAxis;
    }


    public function getOblateSpheroidMinorAxis(): float {
        return $this->oblateSpheroidMinorAxis;
    }

    // endregion


    public function __construct(
        EarthShapeType $shapeType,
        float $sphericalRadius,
        float $oblateSpheroidMajorAxis,
        float $oblateSpheroidMinorAxis
    ) {
        $this->shapeType = $shapeType;
        $this->sphericalRadius = $sphericalRadius;
        $this->oblateSpheroidMajorAxis = $oblateSpheroidMajorAxis;
        $this->oblateSpheroidMinorAxis = $oblateSpheroidMinorAxis;
    }
}
