<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


use InvalidArgumentException;

class Circle2d implements IGeometry2d {
    public function __construct(
        public Position2d $center,
        public Length $radius
    ) {
        if ($radius->value < 0) {
            throw new InvalidArgumentException("negative radius is not allowed: " . $radius->value);
        }
    }


    public function toString(): string {
        return $this->center->toString(", ") . ", r=" . $this->radius->toString();
    }
}
