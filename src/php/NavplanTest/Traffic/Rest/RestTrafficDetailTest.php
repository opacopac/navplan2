<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use Navplan\Traffic\Rest\RestTrafficDetail;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class RestTrafficDetailTest extends TestCase {
    public function test_toRest() {
        $trafficDetail1 = DummyTrafficDetailResult1::create();

        $restTrafficDetail1 = RestTrafficDetail::toRest($trafficDetail1);

        $this->assertEquals(DummyTrafficDetailResult1::createRest(), $restTrafficDetail1);
    }


    public function test_fromRest() {
        $restTrafficDetail1 = DummyTrafficDetailResult1::createRest();

        $rrafficDetail1 = RestTrafficDetail::fromRest($restTrafficDetail1);

        $this->assertEquals(DummyTrafficDetailResult1::create(), $rrafficDetail1);
    }
}
