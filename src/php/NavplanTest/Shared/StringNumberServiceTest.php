<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use Navplan\Shared\StringNumberService;
use PHPUnit\Framework\TestCase;

class StringNumberServiceTest extends TestCase {
    public function test_getValueOrNull() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberService::getValueOrNull($args, "key1");
        $this->assertEquals("val1", $val1);

        $val0 = StringNumberService::getValueOrNull($args, "key0");
        $this->assertEquals(NULL, $val0);
    }
}
