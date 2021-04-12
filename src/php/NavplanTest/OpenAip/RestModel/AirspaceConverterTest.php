<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestModel;

use Navplan\OpenAip\RestModel\AirspaceConverter;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceConverterTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();

        $asRest = AirspaceConverter::toRest($as);

        $this->assertEquals(DummyAirspace1::createRest(), $asRest);
    }
}
