<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestModel;

use Navplan\OpenAip\RestModel\AirportConverter;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportConverterTest extends TestCase {
    public function test_toArray() {
        $ad = DummyAirport1::create();

        $adRest = AirportConverter::toRest($ad);

        $this->assertEquals(DummyAirport1::createRest(), $adRest);
    }
}
