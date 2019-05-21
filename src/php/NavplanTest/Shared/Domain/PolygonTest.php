<?php declare(strict_types=1);

namespace NavplanTest\Shared\Domain;

use Navplan\Shared\Domain\Polygon;
use Navplan\Shared\InvalidFormatException;
use PHPUnit\Framework\TestCase;


class PolygonTest extends TestCase
{

    public function test__construct()
    {
        $poly = new Polygon([]);
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->lonLatList);
        $this->assertEquals(0, count($poly->lonLatList));

        $poly2 = new Polygon();
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->lonLatList);
        $this->assertEquals(0, count($poly->lonLatList));
    }


    public function test_createFromString()
    {
        $polyString = "7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1";
        $poly = Polygon::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->lonLatList[0]);
        $this->assertEquals(array(7.9, 47.9), $poly->lonLatList[1]);
        $this->assertEquals(array(8.1, 48.1), $poly->lonLatList[2]);
        $this->assertEquals(array(7.1, 47.1), $poly->lonLatList[3]);
    }


    public function test_createFromString2()
    {
        $polyString = "7.1 47.1, 7.9 47.9, 8.1 48.1, 7.1 47.1";
        $poly = Polygon::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->lonLatList[0]);
        $this->assertEquals(array(7.9, 47.9), $poly->lonLatList[1]);
        $this->assertEquals(array(8.1, 48.1), $poly->lonLatList[2]);
        $this->assertEquals(array(7.1, 47.1), $poly->lonLatList[3]);
    }


    public function test_createFromString_invalid_format_1()
    {
        $polyString = "XXX";
        $this->expectException(InvalidFormatException::class);
        Polygon::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_2()
    {
        $polyString = "7.1 47.1,7.9 xx.x,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidFormatException::class);
        Polygon::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_3()
    {
        $polyString = "7.1 47.1,7.9,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidFormatException::class);
        Polygon::createFromString($polyString);
    }


    public function test_toString()
    {
        $poly = new Polygon([[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]]);
        $polyString = $poly->toString();
        $this->assertEquals("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1", $polyString);
    }
}
