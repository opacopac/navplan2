<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section5;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationSection;


class DummySection5_1 {
    public static function create(): DataRepresentationSection {
        return new DataRepresentationSection(
            25,
            DummyDataRepresentationTemplate0_1::create()
        );
    }


    public static function createData(): string {
        return pack("Nn",25, 0)
            . DummyDataRepresentationTemplate0_1::createData();
    }
}
