<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


class LineInterval2d implements IGeometry2d {
    public function __construct(
        public Position2d $start,
        public Position2d $end
    ) {
    }
}
