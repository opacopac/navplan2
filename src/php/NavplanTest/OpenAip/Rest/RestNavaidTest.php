<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\OpenAip\Rest\RestNavaid;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class RestNavaidTest extends TestCase {
    public function test_toArray() {
        $navaid = DummyNavaid1::create();

        $navaidRest = RestNavaid::toRest($navaid);

        $this->assertEquals(DummyNavaid1::createRest(), $navaidRest);
    }
}
