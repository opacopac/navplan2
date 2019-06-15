<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\OpenAip\Rest\RestAirport;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class RestAirportTest extends TestCase {
    public function test_toArray() {
        $ad = DummyAirport1::create();

        $adRest = RestAirport::toRest($ad);

        $this->assertEquals(DummyAirport1::createRest(), $adRest);
    }
}
