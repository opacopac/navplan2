<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Polygon;
use PHPUnit\Framework\TestCase;


class PolygonTest extends TestCase
{

    public function test__construct()
    {
        $poly = new Polygon([]);
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->position2dList);
        $this->assertEquals(0, count($poly->position2dList));

        $poly2 = new Polygon();
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->position2dList);
        $this->assertEquals(0, count($poly->position2dList));
    }


    public function test_createFromString()
    {
        $polyString = "7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1";
        $poly = Polygon::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[0]->toArray());
        $this->assertEquals(array(7.9, 47.9), $poly->position2dList[1]->toArray());
        $this->assertEquals(array(8.1, 48.1), $poly->position2dList[2]->toArray());
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[3]->toArray());
    }


    public function test_createFromString2()
    {
        $polyString = "7.1 47.1, 7.9 47.9, 8.1 48.1, 7.1 47.1";
        $poly = Polygon::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[0]->toArray());
        $this->assertEquals(array(7.9, 47.9), $poly->position2dList[1]->toArray());
        $this->assertEquals(array(8.1, 48.1), $poly->position2dList[2]->toArray());
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[3]->toArray());
    }


    public function test_createFromString_invalid_format_1()
    {
        $polyString = "XXX";
        $this->expectException(InvalidArgumentException::class);
        Polygon::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_2()
    {
        $polyString = "7.1 47.1,7.9 xx.x,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidArgumentException::class);
        Polygon::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_3()
    {
        $polyString = "7.1 47.1,7.9,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidArgumentException::class);
        Polygon::createFromString($polyString);
    }


    public function test_createFromArray()
    {
        $polyArray = [[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]];
        $poly = Polygon::createFromArray($polyArray);
        $this->assertEquals($poly->toArray(), $polyArray);
    }


    public function test_toString()
    {
        $poly = Polygon::createFromArray([[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]]);
        $polyString = $poly->toString();
        $this->assertEquals("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1", $polyString);
    }
}
