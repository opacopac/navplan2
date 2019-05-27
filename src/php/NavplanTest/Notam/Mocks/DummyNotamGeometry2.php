<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Geometry\Domain\Ring2d;
use Navplan\Notam\Domain\NotamGeometry;


class DummyNotamGeometry2 {
    public static function create(): NotamGeometry {
        return new NotamGeometry(
            Ring2d::createFromArray([[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]),
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "geometry" => '{"polygon":[[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]}'
        );
    }
}
