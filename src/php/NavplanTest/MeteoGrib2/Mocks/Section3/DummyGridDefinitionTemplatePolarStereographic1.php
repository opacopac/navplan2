<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\LatLon;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplatePolarStereographic;


class DummyGridDefinitionTemplatePolarStereographic1 {
    public static function create(): GridDefinitionTemplatePolarStereographic {
        return new GridDefinitionTemplatePolarStereographic(
            DummyEarthShape1::create(),
            5,
            5,
            new LatLon(40.000001, 349.999999),
            DummyResolutionAndComponentFlags1::create(),
            new LatLon(40.000001, 0.0),
            100000000,
            100000000,
            DummyProjectionCenter1::create(),
            DummyScanningMode1::create()
        );
    }


    public static function createData(): string {
        return
            DummyEarthShape1::createData() .
            pack("NNNNCNNNNCC",
                5, 5,
                40000001, 349999999,
                DummyResolutionAndComponentFlags1::createValue(),
                40000001, 0,
                100000000, 100000000,
                DummyProjectionCenter1::createValue(),
                DummyScanningMode1::createValue()
            );
    }
}
