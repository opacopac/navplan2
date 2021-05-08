<?php declare(strict_types=1);

namespace NavplanTest\Airspace\RestModel;

use Navplan\Airspace\RestModel\RestAirspaceConverter;
use NavplanTest\Airspace\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class RestAirspaceConverterTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();

        $asRest = RestAirspaceConverter::toRest($as);

        $this->assertEquals(DummyAirspace1::createRest(), $asRest);
    }
}
