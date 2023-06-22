<?php declare(strict_types=1);

namespace Navplan\Geoname\Domain\Model;

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


    public static function createFromPosition(Position2d $position, Altitude $elevation): Geoname {
        $name = round($position->latitude, 4) . " " . round($position->longitude, 4);
        return new Geoname(
            -1,
            $name,
            $name,
            'X',
            'POS',
            '',
            '',
            '',
            0,
            $position,
            $elevation
        );
    }
}
