<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\Shared\Domain\Polygon;


class DummyReportingSector1 {
    public static function create(): ReportingPoint {
        return new ReportingPoint(
            72,
            "SECTOR",
            "LSGE",
            "Sect S",
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            new Polygon([[7.0282, 46.7227], [7.0486, 46.7382], [7.0894, 46.7328], [7.0952, 46.7168], [7.0808, 46.7137], [7.0661, 46.7128], [7.0513, 46.7143], [7.0394, 46.7176], [7.0282, 46.7227]])
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
}
