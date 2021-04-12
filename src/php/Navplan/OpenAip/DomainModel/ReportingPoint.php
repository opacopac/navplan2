<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Ring2d;


// TODO: split into ReportingPoint & ReportingSector
class ReportingPoint {
    public $id;
    public $type;
    public $airport_icao;
    public $name;
    public $heli;
    public $inbd_comp;
    public $outbd_comp;
    public $alt_min;
    public $alt_max;
    public $position;
    public $polygon;


    public function __construct(
        int $id,
        string $type,
        string $airport_icao,
        string $name,
        bool $heli,
        bool $inbd_comp,
        bool $outbd_comp,
        ?Length $alt_min,
        ?Length $alt_max,
        ?Position2d $position,
        ?Ring2d $polygon
    ) {
        $this->id = $id;
        $this->type = $type;
        $this->airport_icao = $airport_icao;
        $this->name = $name;
        $this->heli = $heli;
        $this->inbd_comp = $inbd_comp;
        $this->outbd_comp = $outbd_comp;
        $this->alt_min = $alt_min;
        $this->alt_max = $alt_max;
        $this->position = $position;
        $this->polygon = $polygon;
    }
}
