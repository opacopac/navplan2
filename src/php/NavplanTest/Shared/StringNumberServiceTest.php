<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use InvalidArgumentException;
use Navplan\Shared\StringNumberService;
use PHPUnit\Framework\TestCase;


class StringNumberServiceTest extends TestCase {
    public function test_isNullOrEmpty() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberService::isNullOrEmpty($args, "key1");
        $this->assertEquals(false, $val1);

        $val0 = StringNumberService::isNullOrEmpty($args, "key0");
        $this->assertEquals(true, $val0);
    }
    
    
    // region parseStringOrNull

    public function test_parseStringOrNull_success() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberService::parseStringOrNull($args, "key1");
        $this->assertEquals("val1", $val1);
    }


    public function test_parseStringOrNull_null() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val0 = StringNumberService::parseStringOrNull($args, "key0");
        $this->assertEquals(NULL, $val0);
    }
    
    // endregion


    //region parseStringOrError

    public function test_parseStringOrError_success() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberService::parseStringOrError($args, "key1");
        $this->assertEquals("val1", $val1);
    }


    public function test_parseStringOrError_throw() {
        $args = array("key1" => "val1", "key2" => "val2");
        $this->expectException(InvalidArgumentException::class);
        StringNumberService::parseStringOrError($args, "key0");
    }
    
    // endregion


    // region parseIntOrZero

    public function test_parseIntOrZero_success() {
        $args = array("key1" => "123", "key2" => 456, "key3" => 987.6);
        $val1 = StringNumberService::parseIntOrZero($args, "key1");
        $this->assertEquals(123, $val1);

        $val2 = StringNumberService::parseIntOrZero($args, "key2");
        $this->assertEquals(456, $val2);

        $val3 = StringNumberService::parseIntOrZero($args, "key3");
        $this->assertEquals(987, $val3);
    }


    public function test_parseIntOrZero_zero() {
        $args = array("key1" => "abc", "key2" => 456);
        $val0 = StringNumberService::parseIntOrZero($args, "key0");
        $this->assertEquals(0, $val0);

        $val1 = StringNumberService::parseIntOrZero($args, "key1");
        $this->assertEquals(0, $val1);
    }

    // endregion


    // region parseIntOrError

    public function test_parseIntOrError_success() {
        $args = array("key1" => "123", "key2" => 456, "key3" => 987.6);
        $val1 = StringNumberService::parseIntOrError($args, "key1");
        $this->assertEquals(123, $val1);

        $val1 = StringNumberService::parseIntOrError($args, "key2");
        $this->assertEquals(456, $val1);

        $val1 = StringNumberService::parseIntOrError($args, "key3");
        $this->assertEquals(987, $val1);
    }


    public function test_parseIntOrError_throw1() {
        $args = array("key1" => "123", "key2" => 456);
        $this->expectException(InvalidArgumentException::class);
        StringNumberService::parseIntOrError($args, "key0");
    }


    public function test_parseIntOrError_throw2() {
        $args = array("key1" => "abc", "key2" => 456);
        $this->expectException(InvalidArgumentException::class);
        StringNumberService::parseIntOrError($args, "key1");
    }
    
    // endregion


    // region parseFloatOrZero

    public function test_parseFloatOrZero_success() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $val1 = StringNumberService::parseFloatOrZero($args, "key1");
        $this->assertEquals(123.4, $val1);

        $val2 = StringNumberService::parseFloatOrZero($args, "key2");
        $this->assertEquals(456.7, $val2);
    }


    public function test_parseFloatOrZero_zero() {
        $args = array("key1" => "abc.d", "key2" => 456.7);
        $val0 = StringNumberService::parseFloatOrZero($args, "key0");
        $this->assertEquals(0, $val0);

        $val1 = StringNumberService::parseFloatOrZero($args, "key1");
        $this->assertEquals(0, $val1);
    }

    // endregion


    // region parseFloatOrError

    public function test_parseFloatOrError_success() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $val1 = StringNumberService::parseFloatOrError($args, "key1");
        $this->assertEquals(123.4, $val1);

        $val1 = StringNumberService::parseFloatOrError($args, "key2");
        $this->assertEquals(456.7, $val1);
    }


    public function test_parseFloatOrError_throw1() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $this->expectException(InvalidArgumentException::class);
        StringNumberService::parseFloatOrError($args, "key0");
    }


    public function test_parseFloatOrError_throw2() {
        $args = array("key1" => "abc", "key2" => 456.7);
        $this->expectException(InvalidArgumentException::class);
        StringNumberService::parseFloatOrError($args, "key1");
    }

    // endregion
}
