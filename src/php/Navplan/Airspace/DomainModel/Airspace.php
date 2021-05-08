<?php declare(strict_types=1);

namespace Navplan\Airspace\DomainModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Ring2d;


class Airspace {
    public function __construct(
        public int $id,
        public int $aip_id,
        public string $category,
        public string $country,
        public string $name,
        public Altitude $alt_bottom,
        public Altitude $alt_top,
        public Ring2d $polygon
    ) {
    }
}
