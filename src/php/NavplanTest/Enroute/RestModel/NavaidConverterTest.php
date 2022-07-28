<?php declare(strict_types=1);

namespace NavplanTest\Enroute\RestModel;

use Navplan\Enroute\Rest\Model\RestNavaidConverter;
use NavplanTest\Enroute\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidConverterTest extends TestCase {
    public function test_toArray() {
        $navaid = DummyNavaid1::create();

        $navaidRest = RestNavaidConverter::toRest($navaid);

        $this->assertEquals(DummyNavaid1::createRest(), $navaidRest);
    }
}
