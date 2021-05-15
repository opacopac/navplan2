<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Ring2d;


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
