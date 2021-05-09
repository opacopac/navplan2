<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Line2d implements IGeometry2d {
    public function __construct(public array $position2dList = []) {
        foreach ($position2dList as $pos2d) {
            if (!$pos2d instanceof Position2d) {
                throw new InvalidArgumentException('argument is not of type Position2d');
            }
        }
    }
}
