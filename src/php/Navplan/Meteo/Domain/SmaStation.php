<?php declare(strict_types=1);

namespace Navplan\Meteo\Domain;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\Position2d;


class SmaStation {
    public $id;
    public $name;
    public $position;
    public $altitude;


    public function __construct(
        string $id,
        string $name,
        Position2d $position,
        Altitude $altitude
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->position = $position;
        $this->altitude = $altitude;
    }
}
