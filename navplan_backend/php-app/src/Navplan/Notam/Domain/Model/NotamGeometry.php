<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\IGeometry2d;


class NotamGeometry {
    public function __construct(
        public IGeometry2d $shape,
        public ?Altitude $bottomAltitude,
        public ?Altitude $topAltitude
    ) {
    }
}
