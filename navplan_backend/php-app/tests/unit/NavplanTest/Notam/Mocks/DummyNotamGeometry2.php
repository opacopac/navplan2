<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Notam\Domain\Model\NotamGeometry;


class DummyNotamGeometry2 {
    public static function create(): NotamGeometry {
        return new NotamGeometry(
            Ring2d::fromArray([[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]),
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "geometry" => '{"polygon":[[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]]}'
        );
    }


    public static function createRest(): array {
        return array(
            "polygon" => [[28.231586,-26.128897],[28.231642,-26.128453],[28.230906,-26.128975]],
            "alt_bottom" => NULL,
            "alt_top" => NULL
        );
    }
}
