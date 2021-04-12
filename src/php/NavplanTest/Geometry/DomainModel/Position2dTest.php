<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use InvalidArgumentException;
use Navplan\Geometry\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class Position2dTest extends TestCase {
    public function test__construct() {
        $pos = new Position2d(7.0, 47.0);

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
    }


    public function test_createFromString() {

        $pos = Position2d::createFromString("7.0 47.0");
        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
    }


    public function test_createFromString_custom_separator() {
        $pos = Position2d::createFromString("7.0|47.0", "|");

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
    }


    public function test_createFromString_trim_space() {
        $pos = Position2d::createFromString("7.0, 47.0", ",");

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
    }


    public function test_createFromString_invalid_format_1() {
        $posString = "7.9 xx.x";
        $this->expectException(InvalidArgumentException::class);
        Position2d::createFromString($posString);
    }


    public function test_createFromString_invalid_format_2() {
        $posString = "7.9";
        $this->expectException(InvalidArgumentException::class);
        Position2d::createFromString($posString);
    }


    public function test_createFromArray() {
        $pos = Position2d::createFromArray([7.0, 47.0]);
        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
    }


    public function test_createFromArray_invalid_array_1() {
        $this->expectException(InvalidArgumentException::class);
        $pos = Position2d::createFromArray([7.0]);
    }


    public function test_createFromArray_invalid_array_2() {
        $this->expectException(InvalidArgumentException::class);
        $pos = Position2d::createFromArray([]);
    }


    public function test_createFromArray_invalid_array_3() {
        $this->expectException(InvalidArgumentException::class);
        $pos = Position2d::createFromArray(["7.0", "xyz"]);
    }


    public function test_toString() {
        $pos = new Position2d(7.1, 47.1);
        $posString = $pos->toString();
        $this->assertEquals("7.1 47.1", $posString);
    }


    public function test_toArray() {
        $pos = new Position2d(7.1, 47.1);
        $posArray = $pos->toArray();
        $this->assertEquals([7.1, 47.1], $posArray);
    }
}
