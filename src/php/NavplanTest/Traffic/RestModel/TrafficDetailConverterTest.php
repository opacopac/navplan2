<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use Navplan\Traffic\RestModel\RestTrafficDetailConverter;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class TrafficDetailConverterTest extends TestCase {
    public function test_toRest() {
        $trafficDetail1 = DummyTrafficDetailResult1::create();

        $restTrafficDetail1 = RestTrafficDetailConverter::toRest($trafficDetail1);

        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetail1);
    }


    public function test_fromRest() {
        $restTrafficDetail1 = DummyTrafficDetailResult1::createRest();

        $rrafficDetail1 = RestTrafficDetailConverter::fromRest($restTrafficDetail1);

        $this->assertEquals(DummyTrafficDetailResult1::create(), $rrafficDetail1);
    }
}
