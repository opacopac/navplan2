<?php declare(strict_types=1);

namespace Navplan\Geoname\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;


class Geoname {
    public function __construct(
        public int $id,
        public string $name,
        public string $searchresultname,
        public string $feature_class,
        public string $feature_code,
        public string $country,
        public ?string $admin1,
        public ?string $admin2,
        public int $population,
        public Position2d $position,
        public Altitude $elevation
    ) {
    }
}
