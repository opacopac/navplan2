<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;


use InvalidArgumentException;

class Circle2d implements IGeometry2d {
    public $center;
    public $radius;


    public function __construct(
        Position2d $center,
        Length $radius
    ) {
        if ($radius->value < 0) {
            throw new InvalidArgumentException("negative radius is not allowed: " . $radius->value);
        }

        $this->center = $center;
        $this->radius = $radius;
    }
}
