<?php declare(strict_types=1);

namespace NavplanTest\Airport\RestModel;

use Navplan\Aerodrome\RestModel\RestAirportConverter;
use NavplanTest\Aerodrome\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class RestAirportConverterTest extends TestCase {
    public function test_toArray() {
        $ad = DummyAirport1::create();

        $adRest = RestAirportConverter::toRest($ad);

        $this->assertEquals(DummyAirport1::createRest(), $adRest);
    }
}
