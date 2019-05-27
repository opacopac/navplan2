<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;

use Navplan\Geometry\Domain\Ring2d;
use Navplan\Geometry\Domain\Position2d;


// TODO: split into ReportingPoint & ReportingSector
class ReportingPoint {
    public $id;
    public $type;
    public $airport_icao;
    public $name;
    public $heli;
    public $inbd_comp;
    public $outbd_comp;
    public $min_ft;
    public $max_ft;
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
        ?int $min_ft,
        ?int $max_ft,
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
        $this->min_ft = $min_ft;
        $this->max_ft = $max_ft;
        $this->position = $position;
        $this->polygon = $polygon;
    }
}
