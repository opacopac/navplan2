<?php declare(strict_types=1);

namespace NavplanTest\Common;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;
use PHPUnit\Framework\TestCase;


class StringNumberServiceTest extends TestCase {
    public function test_isNullOrEmpty() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberHelper::isNullOrEmpty($args, "key1");
        $this->assertEquals(false, $val1);

        $val0 = StringNumberHelper::isNullOrEmpty($args, "key0");
        $this->assertEquals(true, $val0);
    }


    // region parseStringOrNull

    public function test_parseStringOrNull_success() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberHelper::parseStringOrNull($args, "key1");
        $this->assertEquals("val1", $val1);
    }


    public function test_parseStringOrNull_null() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val0 = StringNumberHelper::parseStringOrNull($args, "key0");
        $this->assertEquals(NULL, $val0);
    }

    // endregion


    //region parseStringOrError

    public function test_parseStringOrError_success() {
        $args = array("key1" => "val1", "key2" => "val2");
        $val1 = StringNumberHelper::parseStringOrError($args, "key1");
        $this->assertEquals("val1", $val1);
    }


    public function test_parseStringOrError_throw() {
        $args = array("key1" => "val1", "key2" => "val2");
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseStringOrError($args, "key0");
    }

    // endregion


    // region parseIntOrNull

    public function test_parseIntOrNull_success() {
        $args = array("key1" => "123", "key2" => 456, "key3" => 987.6);
        $val1 = StringNumberHelper::parseIntOrNull($args, "key1");
        $this->assertEquals(123, $val1);

        $val2 = StringNumberHelper::parseIntOrNull($args, "key2");
        $this->assertEquals(456, $val2);

        $val3 = StringNumberHelper::parseIntOrNull($args, "key3");
        $this->assertEquals(987, $val3);
    }


    public function test_parseIntOrNull_zero() {
        $args = array("key1" => "abc", "key2" => 456);
        $val0 = StringNumberHelper::parseIntOrNull($args, "key0");
        $this->assertEquals(0, $val0);

        $val1 = StringNumberHelper::parseIntOrNull($args, "key1");
        $this->assertEquals(0, $val1);
    }


    public function test_parseIntOrNull_zero_is_null() {
        $args = array("key1" => 0);
        $val0 = StringNumberHelper::parseIntOrNull($args, "key1");
        $this->assertNotNull($val0);
        $this->assertEquals(0, $val0);

        $val1 = StringNumberHelper::parseIntOrNull($args, "key1", true);
        $this->assertNull($val1);
    }

    // endregion


    // region parseIntOrZero

    public function test_parseIntOrZero_success() {
        $args = array("key1" => "123", "key2" => 456, "key3" => 987.6);
        $val1 = StringNumberHelper::parseIntOrZero($args, "key1");
        $this->assertEquals(123, $val1);

        $val2 = StringNumberHelper::parseIntOrZero($args, "key2");
        $this->assertEquals(456, $val2);

        $val3 = StringNumberHelper::parseIntOrZero($args, "key3");
        $this->assertEquals(987, $val3);
    }


    public function test_parseIntOrZero_zero() {
        $args = array("key1" => "abc", "key2" => 456);
        $val0 = StringNumberHelper::parseIntOrZero($args, "key0");
        $this->assertEquals(0, $val0);

        $val1 = StringNumberHelper::parseIntOrZero($args, "key1");
        $this->assertEquals(0, $val1);
    }

    // endregion


    // region parseIntOrError

    public function test_parseIntOrError_success() {
        $args = array("key1" => "123", "key2" => 456, "key3" => 987.6);
        $val1 = StringNumberHelper::parseIntOrError($args, "key1");
        $this->assertEquals(123, $val1);

        $val1 = StringNumberHelper::parseIntOrError($args, "key2");
        $this->assertEquals(456, $val1);

        $val1 = StringNumberHelper::parseIntOrError($args, "key3");
        $this->assertEquals(987, $val1);
    }


    public function test_parseIntOrError_throw1() {
        $args = array("key1" => "123", "key2" => 456);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseIntOrError($args, "key0");
    }


    public function test_parseIntOrError_throw2() {
        $args = array("key1" => "abc", "key2" => 456);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseIntOrError($args, "key1");
    }

    // endregion


    // region parseFloatOrNull

    public function test_parseFloatOrNull_success() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $val1 = StringNumberHelper::parseFloatOrNull($args, "key1");
        $this->assertEquals(123.4, $val1);

        $val2 = StringNumberHelper::parseFloatOrNull($args, "key2");
        $this->assertEquals(456.7, $val2);
    }


    public function test_parseFloatOrNull_null() {
        $args = array("key1" => "abc.d", "key2" => 456.7);
        $val0 = StringNumberHelper::parseFloatOrNull($args, "key0");
        $this->assertNull($val0);

        $val1 = StringNumberHelper::parseFloatOrNull($args, "key1");
        $this->assertNull($val1);
    }


    public function test_parseFloatOrNull_zero_is_null() {
        $args = array("key1" => 0.0);
        $val0 = StringNumberHelper::parseFloatOrNull($args, "key1");
        $this->assertNotNull($val0);
        $this->assertEquals(0.0, $val0);

        $val1 = StringNumberHelper::parseFloatOrNull($args, "key1", true);
        $this->assertNull($val1);
    }

    // endregion


    // region parseFloatOrZero

    public function test_parseFloatOrZero_success() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $val1 = StringNumberHelper::parseFloatOrZero($args, "key1");
        $this->assertEquals(123.4, $val1);

        $val2 = StringNumberHelper::parseFloatOrZero($args, "key2");
        $this->assertEquals(456.7, $val2);
    }


    public function test_parseFloatOrZero_zero() {
        $args = array("key1" => "abc.d", "key2" => 456.7);
        $val0 = StringNumberHelper::parseFloatOrZero($args, "key0");
        $this->assertEquals(0, $val0);

        $val1 = StringNumberHelper::parseFloatOrZero($args, "key1");
        $this->assertEquals(0, $val1);
    }

    // endregion


    // region parseFloatOrError

    public function test_parseFloatOrError_success() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $val1 = StringNumberHelper::parseFloatOrError($args, "key1");
        $this->assertEquals(123.4, $val1);

        $val1 = StringNumberHelper::parseFloatOrError($args, "key2");
        $this->assertEquals(456.7, $val1);
    }


    public function test_parseFloatOrError_throw1() {
        $args = array("key1" => "123.4", "key2" => 456.7);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseFloatOrError($args, "key0");
    }


    public function test_parseFloatOrError_throw2() {
        $args = array("key1" => "abc", "key2" => 456.7);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseFloatOrError($args, "key1");
    }

    // endregion


    // region parseBoolOrError

    public function test_parseBoolOrError_success_true() {
        $args = array("key1" => true, "key2" => 1, "key3" => "true", "key4" => "1", "key5" => " TruE ");
        $val1 = StringNumberHelper::parseBoolOrError($args, "key1");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key2");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key3");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key4");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key5");
        $this->assertEquals(true, $val1);
    }


    public function test_parseBoolOrError_success_false() {
        $args = array("key1" => FALSE, "key2" => 0, "key3" => "false", "key4" => "0", "key5" => " fALse ");
        $val1 = StringNumberHelper::parseBoolOrError($args, "key1");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key2");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key3");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key4");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrError($args, "key5");
        $this->assertEquals(FALSE, $val1);
    }


    public function test_parseBoolOrError_throw1() {
        $args = array("key1" => true, "key2" => false);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseBoolOrError($args, "key0");
    }


    public function test_parseBoolOrError_throw2() {
        $args = array("key1" => 2, "key2" => false);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseBoolOrError($args, "key1");
    }


    public function test_parseBoolOrError_throw3() {
        $args = array("key1" => "falsch", "key2" => false);
        $this->expectException(InvalidArgumentException::class);
        StringNumberHelper::parseBoolOrError($args, "key1");
    }


    // endregion


    // region parseBoolOrNull

    public function test_parseBoolOrNull_true() {
        $args = array("key1" => true, "key2" => 1, "key3" => "true", "key4" => "1", "key5" => " TruE ");
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key1");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key2");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key3");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key4");
        $this->assertEquals(true, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key5");
        $this->assertEquals(true, $val1);
    }


    public function test_parseBoolOrNull_false() {
        $args = array("key1" => FALSE, "key2" => 0, "key3" => "false", "key4" => "0", "key5" => " fALse ");
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key1");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key2");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key3");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key4");
        $this->assertEquals(FALSE, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key5");
        $this->assertEquals(FALSE, $val1);
    }


    public function test_parseBoolOrNull_null() {
        $args = array("key1" => 2, "key2" => "falsch", "key3" => -2, "key4" => "2");
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key0");
        $this->assertEquals(NULL, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key1");
        $this->assertEquals(NULL, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key2");
        $this->assertEquals(NULL, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key3");
        $this->assertEquals(NULL, $val1);
        $val1 = StringNumberHelper::parseBoolOrNull($args, "key4");
        $this->assertEquals(NULL, $val1);
    }


    // endregion
}
