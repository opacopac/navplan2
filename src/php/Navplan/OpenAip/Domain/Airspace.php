<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


use Navplan\Geometry\Domain\Ring2d;

class Airspace {
    public $id;
    public $aip_id;
    public $category;
    public $country;
    public $name;
    public $alt_bottom;
    public $alt_top;
    public $polygon;


    public function __construct(
        int $id,
        int $aip_id,
        string $category,
        string $country,
        string $name,
        AirspaceAltitude $alt_bottom,
        AirspaceAltitude $alt_top,
        Ring2d $polygon
    ) {
        $this->id = $id;
        $this->aip_id = $aip_id;
        $this->category = $category;
        $this->country = $country;
        $this->name = $name;
        $this->alt_bottom = $alt_bottom;
        $this->alt_top = $alt_top;
        $this->polygon = $polygon;
    }
}
