<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\OpenAip\Rest\RestAirspace;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class RestAirspaceTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();

        $asRest = RestAirspace::toRest($as);

        $this->assertEquals(DummyAirspace1::createRest(), $asRest);
    }
}
