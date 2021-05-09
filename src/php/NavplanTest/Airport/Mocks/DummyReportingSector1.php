<?php declare(strict_types=1);

namespace NavplanTest\Airport\Mocks;

use Navplan\Airport\DomainModel\ReportingPoint;
use Navplan\Common\DomainModel\Ring2d;


class DummyReportingSector1 {
    public static function create(): ReportingPoint {
        return new ReportingPoint(
            72,
            "SECTOR",
            "LSGE",
            "Sect S",
            FALSE,
            FALSE,
            FALSE,
            NULL,
            NULL,
            NULL,
            Ring2d::createFromArray([[7.0282, 46.7227], [7.0486, 46.7382], [7.0894, 46.7328], [7.0952, 46.7168], [7.0808, 46.7137], [7.0661, 46.7128], [7.0513, 46.7143], [7.0394, 46.7176], [7.0282, 46.7227]])
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 72,
            "type" => "SECTOR",
            "airport_icao" => "LSGE",
            "name" => "Sect S",
            "heli" => NULL,
            "inbd_comp" => NULL,
            "outbd_comp" => NULL,
            "min_ft" => NULL,
            "max_ft" => NULL,
            "latitude" => NULL,
            "longitude" => NULL,
            "polygon" => "7.0282 46.7227, 7.0486 46.7382, 7.0894 46.7328, 7.0952 46.7168, 7.0808 46.7137, 7.0661 46.7128, 7.0513 46.7143, 7.0394 46.7176, 7.0282 46.7227"
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 72,
            "type" => "SECTOR",
            "airport_icao" => "LSGE",
            "name" => "Sect S",
            "heli" => FALSE,
            "inbd_comp" => FALSE,
            "outbd_comp" => FALSE,
            "alt_min" => NULL,
            "alt_max" => NULL,
            "pos" => NULL,
            "polygon" => [[7.0282, 46.7227], [7.0486, 46.7382], [7.0894, 46.7328], [7.0952, 46.7168], [7.0808, 46.7137], [7.0661, 46.7128], [7.0513, 46.7143], [7.0394, 46.7176], [7.0282, 46.7227]]
        );
    }
}
