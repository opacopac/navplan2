<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestModel;

use Navplan\OpenAip\RestModel\NavaidConverter;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidConverterTest extends TestCase {
    public function test_toArray() {
        $navaid = DummyNavaid1::create();

        $navaidRest = NavaidConverter::toRest($navaid);

        $this->assertEquals(DummyNavaid1::createRest(), $navaidRest);
    }
}
