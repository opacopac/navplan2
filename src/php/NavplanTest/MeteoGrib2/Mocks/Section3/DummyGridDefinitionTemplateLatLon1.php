<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplateLatLon;
use Navplan\MeteoGrib2\Domain\Section3\LatLon;


class DummyGridDefinitionTemplateLatLon1 {
    public static function create(): GridDefinitionTemplateLatLon {
        return new GridDefinitionTemplateLatLon(
            DummyEarthShape1::create(),
            10,
            20,
            1,
            2,
            new LatLon(47.0, 7.0),
            DummyResolutionAndComponentFlags1::create(),
            new LatLon(48.0, 8.0),
            10000000,
            20000000,
            DummyScanningMode1::create()
        );
    }


    public static function createData(): string {
        return
            DummyEarthShape1::createData() .
            pack("NNNNNNCNNNNC",
                10, 20,
                1, 2,
                47000000, 7000000,
                DummyResolutionAndComponentFlags1::createValue(),
                48000000, 8000000,
                10000000, 20000000,
                DummyScanningMode1::createValue()
            );
    }
}
