<?php declare(strict_types=1);

namespace NavplanTest\Enroute\RestModel;

use Navplan\Enroute\Rest\Converter\RestAirspaceConverter;
use NavplanTest\Enroute\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class RestAirspaceConverterTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();

        $asRest = RestAirspaceConverter::toRest($as);

        $this->assertEquals(DummyAirspace1::createRest(), $asRest);
    }
}
