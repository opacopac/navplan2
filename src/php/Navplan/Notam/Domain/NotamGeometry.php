<?php declare(strict_types=1);

namespace Navplan\Notam\Domain;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\IGeometry2d;


class NotamGeometry {
    public $shape;
    public $bottomAltitude;
    public $topAltitude;


    public function __construct(
        IGeometry2d $shape,
        ?Altitude $bottomAltitude,
        ?Altitude $topAltitude
    ) {
        $this->shape = $shape;
        $this->bottomAltitude = $bottomAltitude;
        $this->topAltitude = $topAltitude;
    }
}
